import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECTS_IMG_DIR = path.join(__dirname, '../public/project_image');

async function optimizeImages() {
  const files = fs.readdirSync(PROJECTS_IMG_DIR).filter(file => {
    return file.match(/\.(jpg|jpeg|png)$/i) && !file.includes('-lowres');
  });

  for (const file of files) {
    const filePath = path.join(PROJECTS_IMG_DIR, file);
    try {
      const imageBuffer = fs.readFileSync(filePath);
      const parsedPath = path.parse(filePath);
      const webpPath = path.join(PROJECTS_IMG_DIR, `${parsedPath.name}.webp`);
      
      const pipeline = sharp(imageBuffer)
        .resize({ width: 1000, withoutEnlargement: true })
        .webp({ quality: 80, effort: 6 }); // Convert to highly efficient WebP
      
      const optimizedBuffer = await pipeline.toBuffer();
      fs.writeFileSync(webpPath, optimizedBuffer);
      
      // Delete the original jpg/png to keep the repo clean
      fs.unlinkSync(filePath);
      
      console.log(`Converted ${file} to WebP: ${(imageBuffer.length / 1024).toFixed(1)} KB -> ${(optimizedBuffer.length / 1024).toFixed(1)} KB`);
    } catch (err) {
      console.error(`Failed to process ${file}:`, err.message);
    }
  }
}

optimizeImages().catch(console.error);
