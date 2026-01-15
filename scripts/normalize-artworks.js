const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '..', 'src', 'data', 'artworks.json');
const raw = fs.readFileSync(file, 'utf8');
let data = JSON.parse(raw);

data = data.map((item) => {
  if (item.image) {
    const filename = item.image.split('/').pop();
    if (filename) item.image = `/images/${filename}`;
  }
  return item;
});

fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
console.log('Normalized artworks.json image paths to /images/');
