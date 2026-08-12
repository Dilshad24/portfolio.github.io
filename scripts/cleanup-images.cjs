const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');
const publicDir = path.join(__dirname, '..', 'public');
const unusedDir = path.join(__dirname, '..', 'unused_assets');

// Ensure unused directory exists
if (!fs.existsSync(unusedDir)) {
  fs.mkdirSync(unusedDir);
}

// Allowed image extensions
const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif', '.pdf']);

// Recursively get all files in a directory
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    if (fs.statSync(path.join(dirPath, file)).isDirectory()) {
      arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, file));
    }
  });

  return arrayOfFiles;
}

// Get all code files (JS, JSX, HTML, CSS)
const codeFiles = getAllFiles(srcDir).filter(file => 
  file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.css')
);
codeFiles.push(path.join(__dirname, '..', 'index.html'));

// Read all code content into a massive string for easy checking
let allCodeContent = '';
for (const file of codeFiles) {
  allCodeContent += fs.readFileSync(file, 'utf8') + '\n';
}

// Find all images in public and src/assets
const allImages = [
  ...getAllFiles(publicDir).filter(f => imageExtensions.has(path.extname(f).toLowerCase())),
  ...getAllFiles(path.join(srcDir, 'assets')).filter(f => imageExtensions.has(path.extname(f).toLowerCase()))
];

let movedCount = 0;

for (const imagePath of allImages) {
  const filename = path.basename(imagePath);
  
  // If the filename (e.g. "myimage.webp") is NOT mentioned anywhere in the code
  // and it's not the favicon or vite.svg (standard files)
  if (!allCodeContent.includes(filename) && filename !== 'favicon.webp' && filename !== 'vite.svg') {
    // Note: Some files might be dynamically generated, let's also check without extension
    const nameWithoutExt = path.parse(filename).name;
    if (!allCodeContent.includes(nameWithoutExt)) {
      console.log(`Unused image found: ${filename}`);
      
      const newPath = path.join(unusedDir, filename);
      // Move the file
      try {
        fs.renameSync(imagePath, newPath);
        movedCount++;
      } catch (err) {
        console.error(`Failed to move ${filename}: ${err.message}`);
      }
    }
  }
}

console.log(`Finished. Moved ${movedCount} unused files to unused_assets/ folder.`);

// Append to .gitignore if not present
const gitignorePath = path.join(__dirname, '..', '.gitignore');
let gitignoreContent = fs.existsSync(gitignorePath) ? fs.readFileSync(gitignorePath, 'utf8') : '';

if (!gitignoreContent.includes('unused_assets')) {
  fs.appendFileSync(gitignorePath, '\n# Unused assets\nunused_assets/\n');
  console.log('Added unused_assets/ to .gitignore');
}
