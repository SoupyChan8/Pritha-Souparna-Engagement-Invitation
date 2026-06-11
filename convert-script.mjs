import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const files = [
  'arch2.png',
  'couple 2.png',
  'rings.png',
  'tree.png',
  'arch.png',
  'couple.png'
];

async function run() {
  for (const file of files) {
    const inputPath = path.join('public/assets', file);
    if (!fs.existsSync(inputPath)) continue;
    
    // Parse the extension out
    const withoutExt = file.replace(/\.png$/, '');
    const outputPath = path.join('public/assets', withoutExt + '.webp');
    
    console.log(`Converting ${inputPath} to ${outputPath}...`);
    await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);
  }
}

run().catch(console.error);
