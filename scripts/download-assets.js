import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RESUME_DOC_ID = '1MATzyPKk4mo2Y2bF9r6yuZmw_Zte1qX2W0G01o5CpoY';
const DATA_FILE = path.join(__dirname, '../src/data/resume-data.json');
const PUBLIC_DIR = path.join(__dirname, '../public');
const CERTS_DIR = path.join(PUBLIC_DIR, 'certs');

async function downloadFile(url, dest) {
  console.log(`Downloading ${url} to ${dest}`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  const buffer = await res.arrayBuffer();
  fs.writeFileSync(dest, Buffer.from(buffer));
  return Buffer.from(buffer);
}

async function main() {
  // Ensure directories exist
  if (!fs.existsSync(CERTS_DIR)) {
    fs.mkdirSync(CERTS_DIR, { recursive: true });
  }

  // 1. Download Resume PDF
  const resumeUrl = `https://docs.google.com/document/d/${RESUME_DOC_ID}/export?format=pdf`;
  await downloadFile(resumeUrl, path.join(PUBLIC_DIR, 'Dilshad_Ali_Resume.pdf'));

  // 2. Download Certificate Images and Update JSON
  if (fs.existsSync(DATA_FILE)) {
    const rawData = fs.readFileSync(DATA_FILE, 'utf8');
    const data = JSON.parse(rawData);

    if (data.certifications && Array.isArray(data.certifications)) {
      for (let i = 0; i < data.certifications.length; i++) {
        const cert = data.certifications[i];
        const match = cert.url?.match(/\/d\/([a-zA-Z0-9_-]+)/);
        
        if (match && match[1]) {
          const driveId = match[1];
          const imgUrl = `https://lh3.googleusercontent.com/d/${driveId}=w1200`;
          const localFileName = `cert-${i}.jpg`;
          
          const imgBuffer = await downloadFile(imgUrl, path.join(CERTS_DIR, localFileName));
          
          // Generate low-res base64 placeholder using sharp
          const lowResBuffer = await sharp(imgBuffer)
            .resize(60) // resize to 60px width for better detail
            .jpeg({ quality: 40 })
            .toBuffer();
          
          const base64Placeholder = `data:image/jpeg;base64,${lowResBuffer.toString('base64')}`;

          // Update the URL to the local path
          cert.url = `/certs/${localFileName}`;
          cert.originalDriveUrl = imgUrl; // keep reference if needed
          cert.placeholder = base64Placeholder; // embed lowres image
        }
      }
      
      // Save updated JSON
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
      console.log('Updated resume-data.json with local certificate paths and low-res placeholders.');
    }
  } else {
    console.log('resume-data.json not found, skipping certificate downloads.');
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
