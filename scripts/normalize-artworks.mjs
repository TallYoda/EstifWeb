import fs from 'fs/promises';
import path from 'path';

const root = process.cwd();
const file = path.resolve(root, 'src', 'data', 'artworks.json');
const raw = await fs.readFile(file, 'utf8');
let data = JSON.parse(raw);

data = data.map((item) => {
  if (item.image) {
    const filename = item.image.split('/').pop();
    if (filename) item.image = `/images/${filename}`;
  }
  return item;
});

await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf8');
console.log('Normalized artworks.json image paths to /images/');
