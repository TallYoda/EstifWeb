import fs from 'fs/promises';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';

const root = process.cwd();
const publicImages = path.join(root, 'public', 'images');
const srcPortfolio = path.join(root, 'src', 'assets', 'img', 'portfolio');
const publicPortfolio = path.join(root, 'public', 'assets', 'img', 'portfolio');
const srcAssetsImg = path.join(root, 'src', 'assets', 'img');

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

async function copyFiles(srcDir) {
  try {
    const files = await fs.readdir(srcDir);
    await Promise.all(
      files.map(async (f) => {
        const src = path.join(srcDir, f);
        const dest = path.join(publicImages, f);
        const stat = await fs.stat(src);
        if (stat.isFile()) {
          await fs.copyFile(src, dest);
          console.log('copied', src, '->', dest);
        }
      })
    );
  } catch (e) {
    // ignore
  }
}

ensureDir(publicImages);
await copyFiles(publicPortfolio);
await copyFiles(srcPortfolio);
await copyFiles(srcAssetsImg);

console.log('Image sync complete');
