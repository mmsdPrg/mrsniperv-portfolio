import sharp from "sharp";
import { mkdir, copyFile, writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const sourceLogo = path.join(root, "logo-source.png");
const publicDir = path.join(root, "public");
const imagesDir = path.join(publicDir, "images");

async function ensureDirs() {
  await mkdir(imagesDir, { recursive: true });
  await mkdir(path.join(publicDir, "icons"), { recursive: true });
}

function removeBlackBackground(data, info, threshold = 28) {
  const pixels = data;
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    if (r <= threshold && g <= threshold && b <= threshold) {
      pixels[i + 3] = 0;
    }
  }
  return sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  });
}

async function buildCroppedLogo() {
  const { data, info } = await sharp(sourceLogo)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const trimmed = await removeBlackBackground(data, info)
    .trim({ threshold: 12 })
    .toBuffer({ resolveWithObject: true });

  const pad = Math.round(Math.max(trimmed.info.width, trimmed.info.height) * 0.05);

  return sharp(trimmed.data, {
    raw: {
      width: trimmed.info.width,
      height: trimmed.info.height,
      channels: trimmed.info.channels,
    },
  }).extend({
    top: pad,
    bottom: pad,
    left: pad,
    right: pad,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });
}

async function generateAssets() {
  await ensureDirs();

  const logoPng = path.join(imagesDir, "logo.png");
  const logoTransparent = path.join(imagesDir, "logo-transparent.png");
  const logoMono = path.join(imagesDir, "logo-monochrome.png");
  const logoMobile = path.join(imagesDir, "logo-mobile.png");

  await copyFile(sourceLogo, logoPng);

  const cropped = await buildCroppedLogo();
  const meta = await cropped.clone().metadata();
  const width = meta.width ?? 500;
  const height = meta.height ?? 500;

  await cropped.clone().png({ compressionLevel: 9 }).toFile(logoTransparent);
  await cropped
    .clone()
    .webp({ quality: 82, effort: 6 })
    .toFile(path.join(imagesDir, "logo-transparent.webp"));

  await sharp(logoTransparent)
    .resize(320, 320, { fit: "inside", withoutEnlargement: true })
    .png({ compressionLevel: 9 })
    .toFile(logoMobile);

  await sharp(logoMobile)
    .webp({ quality: 80, effort: 6 })
    .toFile(path.join(imagesDir, "logo-mobile.webp"));

  await sharp(logoTransparent)
    .webp({ quality: 82, effort: 6 })
    .toFile(path.join(imagesDir, "logo.webp"));

  await sharp(logoTransparent)
    .grayscale()
    .modulate({ brightness: 1.15 })
    .png({ compressionLevel: 9 })
    .toFile(logoMono);

  await sharp(logoMono)
    .webp({ quality: 80, effort: 6 })
    .toFile(path.join(imagesDir, "logo-monochrome.webp"));

  const sizes = [
    { name: "favicon-16x16.png", size: 16 },
    { name: "favicon-32x32.png", size: 32 },
    { name: "apple-touch-icon.png", size: 180 },
    { name: "icon-192.png", size: 192 },
    { name: "icon-512.png", size: 512 },
  ];

  for (const { name, size } of sizes) {
    await sharp(logoTransparent)
      .resize(size, size, {
        fit: "contain",
        background: { r: 5, g: 5, b: 5, alpha: 1 },
      })
      .png({ compressionLevel: 9 })
      .toFile(path.join(publicDir, "icons", name));
  }

  await sharp(logoTransparent)
    .resize(32, 32, {
      fit: "contain",
      background: { r: 5, g: 5, b: 5, alpha: 0 },
    })
    .png()
    .toFile(path.join(publicDir, "favicon.ico"));

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="MrSniperV Logo">
  <title>MrSniperV Logo</title>
  <image href="/images/logo-transparent.png" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet"/>
</svg>`;

  await writeFile(path.join(imagesDir, "logo.svg"), svg);

  console.log(`Logo assets generated (${width}x${height}, cropped).`);
}

generateAssets().catch((err) => {
  console.error(err);
  process.exit(1);
});
