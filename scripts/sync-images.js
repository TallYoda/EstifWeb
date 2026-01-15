const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const publicImages = path.join(root, 'public', 'images');
const srcPortfolio = path.join(root, 'src', 'assets', 'img', 'portfolio');
const publicPortfolio = path.join(root, 'public', 'assets', 'img', 'portfolio');
const srcAssetsImg = path.join(root, 'src', 'assets', 'img');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyFiles(srcDir) {
  if (!fs.existsSync(srcDir)) return;
  const files = fs.readdirSync(srcDir);
  files.forEach((f) => {
    const src = path.join(srcDir, f);
    const dest = path.join(publicImages, f);
    const stat = fs.statSync(src);
    if (stat.isFile()) {
      fs.copyFileSync(src, dest);
      console.log('copied', src, '->', dest);
    }
  });
}

ensureDir(publicImages);
copyFiles(publicPortfolio);
copyFiles(srcPortfolio);

// also copy any standalone images under src/assets/img (e.g., portrait.webp)
copyFiles(srcAssetsImg);

console.log('Image sync complete');
