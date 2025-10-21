/* Image compression script using sharp.
   Targets:
   - senior-woman.webp, BestSeller.webp -> width 1200, quality 72
   - photo1..photo5.webp -> width 640, quality 75
   Overwrites the original files in src/assets/imgs/
*/

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMGS_DIR = path.join(__dirname, '..', 'src', 'assets', 'imgs');

const targets = [
  { name: 'senior-woman.webp', width: 1200, quality: 72 },
  { name: 'BestSeller.webp', width: 1200, quality: 70 },
  { name: 'photo1.webp', width: 640, quality: 75 },
  { name: 'photo2.webp', width: 640, quality: 75 },
  { name: 'photo3.webp', width: 640, quality: 75 },
  { name: 'photo4.webp', width: 640, quality: 75 },
  { name: 'photo5.webp', width: 640, quality: 75 },
];

async function compressOne(file, width, quality) {
  const src = path.join(IMGS_DIR, file);
  if (!fs.existsSync(src)) {
    console.log(`[skip] not found: ${file}`);
    return;
  }
  const tmp = src + '.tmp';
  try {
    const input = sharp(src, { failOn: 'none' });
    const meta = await input.metadata();
    const targetWidth = Math.min(width, meta.width || width);

    await input
      .resize({ width: targetWidth, withoutEnlargement: true })
      .webp({ quality, effort: 6 })
      .toFile(tmp);

    const before = fs.statSync(src).size;
    const after = fs.statSync(tmp).size;

    fs.copyFileSync(tmp, src);
    fs.unlinkSync(tmp);

    console.log(`[ok] ${file} ${Math.round(before/1024)}KB -> ${Math.round(after/1024)}KB`);
  } catch (e) {
    if (fs.existsSync(tmp)) try { fs.unlinkSync(tmp); } catch {}
    console.error(`[error] ${file}:`, e.message);
  }
}

(async () => {
  for (const t of targets) {
    await compressOne(t.name, t.width, t.quality);
  }
  console.log('Done compressing.');
})();
