const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = 'public/assets';

fs.readdirSync(dir).forEach(file => {
  if (file.match(/\.(png|PNG)$/)) {
    const inputPath = path.join(dir, file);
    const outputPath = path.join(dir, path.parse(file).name + '.webp');
    console.log(`Converting ${inputPath} to ${outputPath}`);
    sharp(inputPath).webp().toFile(outputPath);
  }
});
