#!/usr/bin/env node
/**
 * Writes smaller copies of every photo in public/images (name-480w.webp,
 * name-960w.webp, name-1600w.webp) and src/image-manifest.json, which
 * <ResponsiveImage> reads to build srcset, width and height.
 *
 * Run `npm run images` after adding or replacing a photo, and commit the
 * results. Originals are left untouched; they stay the og:image source.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const imagesDir = path.join(root, 'public', 'images');
const manifestFile = path.join(root, 'src', 'image-manifest.json');

const WIDTHS = [480, 960, 1600];
const QUALITY = 72;
const VARIANT = /-\d+w\.webp$/;

async function walk(dir) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(full)));
    else if (e.name.endsWith('.webp') && !VARIANT.test(e.name)) out.push(full);
  }
  return out.sort();
}

const manifest = {};
for (const file of await walk(imagesDir)) {
  const key = '/' + path.relative(path.join(root, 'public'), file).replaceAll('\\', '/');
  const { width, height } = await sharp(file).metadata();
  const widths = [];

  for (const w of WIDTHS) {
    if (w >= width) continue;
    const out = file.replace(/\.webp$/, `-${w}w.webp`);
    await sharp(file).resize({ width: w }).webp({ quality: QUALITY }).toFile(out);
    widths.push(w);
  }

  manifest[key] = { width, height, widths };
  console.log(key, `${width}x${height}`, '->', widths.map((w) => `${w}w`).join(', ') || '(no smaller sizes)');
}

await fs.writeFile(manifestFile, JSON.stringify(manifest, null, 2) + '\n');
console.log('wrote', path.relative(root, manifestFile));
