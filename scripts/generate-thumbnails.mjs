import fs from "fs-extra";
import path from "path";
import sharp from "sharp";

/* --------------------------------------------------
   CONFIG — matches your project exactly
-------------------------------------------------- */

const PROJECT_ROOT = process.cwd();

// Images referenced as "/images/..."
const PUBLIC_IMAGES_DIR = path.join(PROJECT_ROOT, "public", "images");

// Data file
const ARTWORKS_JSON = path.join(
  PROJECT_ROOT,
  "src",
  "data",
  "artworks.json"
);

// Thumbnail settings
const THUMB_SUFFIX = "-thumb";
const THUMB_WIDTH = 480;
const THUMB_QUALITY = 70;

// JSON fields
const IMAGE_FIELD = "image";
const THUMB_FIELD = "thumbnail";

/* -------------------------------------------------- */

function getThumbnailPath(imageUrl) {
  const ext = path.extname(imageUrl);
  const base = imageUrl.replace(ext, "");
  return `${base}${THUMB_SUFFIX}.webp`;
}

function urlToFsPath(imageUrl) {
  // "/images/u3.jpg" → "<project>/public/images/u3.jpg"
  return path.join(PROJECT_ROOT, "public", imageUrl);
}

/* -------------------------------------------------- */

async function createThumbnail(imageUrl) {
  const inputPath = urlToFsPath(imageUrl);
  const thumbUrl = getThumbnailPath(imageUrl);
  const outputPath = urlToFsPath(thumbUrl);

  if (await fs.pathExists(outputPath)) {
    return thumbUrl;
  }

  await sharp(inputPath)
    .resize({ width: THUMB_WIDTH })
    .webp({ quality: THUMB_QUALITY })
    .toFile(outputPath);

  console.log(`✓ Created thumbnail: ${thumbUrl}`);
  return thumbUrl;
}

/* -------------------------------------------------- */

async function run() {
  console.log("📖 Reading artworks.json...");
  const artworks = await fs.readJson(ARTWORKS_JSON);

  let modified = false;

  for (const artwork of artworks) {
    if (!artwork[IMAGE_FIELD]) continue;
    if (artwork[THUMB_FIELD]) continue;

    try {
      const thumbUrl = await createThumbnail(artwork[IMAGE_FIELD]);
      artwork[THUMB_FIELD] = thumbUrl;
      modified = true;
    } catch (err) {
      console.error(
        `✗ Failed processing ${artwork[IMAGE_FIELD]}:`,
        err.message
      );
    }
  }

  if (modified) {
    await fs.writeJson(ARTWORKS_JSON, artworks, { spaces: 2 });
    console.log("📝 Updated artworks.json");
  } else {
    console.log("ℹ️ No updates needed");
  }

  console.log("✅ Thumbnail generation complete");
}

run();
