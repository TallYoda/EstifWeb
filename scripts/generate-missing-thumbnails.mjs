import fs from "fs-extra";
import path from "path";
import sharp from "sharp";

/* --------------------------------------------------
   CONFIG
-------------------------------------------------- */

const PROJECT_ROOT = process.cwd();
const PUBLIC_IMAGES_DIR = path.join(PROJECT_ROOT, "public", "images");

// Thumbnail settings
const THUMB_SUFFIX = "-thumb";
const THUMB_WIDTH = 480;
const THUMB_QUALITY = 70;

/* -------------------------------------------------- */

/**
 * Check if a file ends with 'e' or 'E' (case-insensitive)
 */
function endsWithE(filename) {
  const name = path.parse(filename).name; // Get name without extension
  const lastChar = name.slice(-1).toLowerCase();
  return lastChar === 'e';
}

/**
 * Get thumbnail path for an image file
 */
function getThumbnailPath(imagePath) {
  const ext = path.extname(imagePath);
  const base = path.basename(imagePath, ext);
  return path.join(PUBLIC_IMAGES_DIR, `${base}${THUMB_SUFFIX}.webp`);
}

/**
 * Check if thumbnail already exists
 */
async function thumbnailExists(imagePath) {
  const thumbPath = getThumbnailPath(imagePath);
  return await fs.pathExists(thumbPath);
}

/**
 * Create thumbnail for an image
 */
async function createThumbnail(imagePath) {
  const thumbPath = getThumbnailPath(imagePath);
  
  try {
    await sharp(imagePath)
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .webp({ quality: THUMB_QUALITY })
      .toFile(thumbPath);
    
    const filename = path.basename(imagePath);
    const thumbFilename = path.basename(thumbPath);
    console.log(`✓ Created thumbnail: ${thumbFilename} from ${filename}`);
    return thumbPath;
  } catch (err) {
    console.error(`✗ Failed to create thumbnail for ${path.basename(imagePath)}:`, err.message);
    throw err;
  }
}

/* -------------------------------------------------- */

async function run() {
  console.log("🔍 Scanning public/images for images ending in 'e' or 'E'...\n");
  
  if (!(await fs.pathExists(PUBLIC_IMAGES_DIR))) {
    console.error(`✗ Directory not found: ${PUBLIC_IMAGES_DIR}`);
    process.exit(1);
  }

  // Get all files in the directory
  const files = await fs.readdir(PUBLIC_IMAGES_DIR);
  
  // Filter for image files ending in 'e' or 'E'
  const imageExtensions = ['.jpg', '.jpeg', '.JPG', '.JPEG', '.png', '.PNG', '.webp', '.WEBP', '.avif', '.AVIF'];
  const imagesToProcess = files.filter(file => {
    const ext = path.extname(file);
    return imageExtensions.includes(ext) && endsWithE(file);
  });

  if (imagesToProcess.length === 0) {
    console.log("ℹ️ No images ending in 'e' or 'E' found");
    return;
  }

  console.log(`📋 Found ${imagesToProcess.length} image(s) ending in 'e' or 'E':`);
  imagesToProcess.forEach(file => console.log(`   - ${file}`));
  console.log();

  let created = 0;
  let skipped = 0;
  let errors = 0;

  for (const file of imagesToProcess) {
    const imagePath = path.join(PUBLIC_IMAGES_DIR, file);
    
    // Check if thumbnail already exists
    if (await thumbnailExists(imagePath)) {
      console.log(`⊘ Skipping ${file} (thumbnail already exists)`);
      skipped++;
      continue;
    }

    // Create thumbnail
    try {
      await createThumbnail(imagePath);
      created++;
    } catch (err) {
      errors++;
    }
  }

  console.log("\n" + "=".repeat(50));
  console.log(`✅ Complete!`);
  console.log(`   Created: ${created}`);
  console.log(`   Skipped: ${skipped}`);
  console.log(`   Errors: ${errors}`);
}

run().catch(err => {
  console.error("Fatal error:", err);
  process.exit(1);
});

