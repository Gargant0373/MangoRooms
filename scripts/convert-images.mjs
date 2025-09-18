#!/usr/bin/env node
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const root = process.cwd();
const publicImages = path.join(root, 'public', 'images');

const extensions = ['.jpg', '.jpeg', '.png', '.gif'];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(full));
    } else if (entry.isFile()) {
      files.push(full);
    }
  }
  return files;
}

async function convertFile(file) {
  const ext = path.extname(file).toLowerCase();
  if (!extensions.includes(ext)) return null;
  const dir = path.dirname(file);
  const base = path.basename(file, ext);
  const out = path.join(dir, base + '.webp');

  try {
    await sharp(file)
      .webp({ quality: 80 })
      .toFile(out);
    // remove original
    await fs.unlink(file);
    return { old: path.relative(root, file).replaceAll('\\', '/'), new: path.relative(root, out).replaceAll('\\', '/') };
  } catch (err) {
    console.error('Failed to convert', file, err);
    return null;
  }
}

async function updateReferences(map) {
  // filetypes to scan
  const scanExt = ['.html', '.css', '.js', '.ts', '.jsx', '.tsx', '.json', '.md'];
  async function filesToScan(dir) {
    const res = [];
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        if (e.name === 'node_modules' || e.name === '.git') continue;
        res.push(...await filesToScan(full));
      } else if (e.isFile()) {
        if (scanExt.includes(path.extname(e.name))) res.push(full);
      }
    }
    return res;
  }

  const files = await filesToScan(root);
  for (const file of files) {
    let txt = await fs.readFile(file, 'utf8');
    let updated = false;
    for (const { old: oldRel, new: newRel } of map) {
      const oldName = path.basename(oldRel);
      const newName = path.basename(newRel);
      // replace occurrences of the filename (with quotes or parentheses) - keep it simple
      const re = new RegExp(oldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      if (re.test(txt)) {
        txt = txt.replace(re, newName);
        updated = true;
      }
    }
    if (updated) {
      await fs.writeFile(file, txt, 'utf8');
      console.log('Updated references in', path.relative(root, file));
    }
  }
}

async function main() {
  try {
    const all = await walk(publicImages);
    const convertMap = [];
    for (const f of all) {
      const r = await convertFile(f);
      if (r) {
        console.log('Converted', r.old, '->', r.new);
        convertMap.push(r);
      }
    }
    if (convertMap.length > 0) {
      await updateReferences(convertMap);
      console.log('Conversion complete. Please verify the site and commit changes.');
    } else {
      console.log('No convertible images found under', publicImages);
    }
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  }
}

main();
