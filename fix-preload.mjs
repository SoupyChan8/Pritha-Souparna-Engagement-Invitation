import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const oldArray = `    const imagesToLoad = [
      "/assets/arch2.png",
      "/assets/couple_2.png",
      "/assets/tree.png",
      "/assets/rings.png",
    ];`;

const newArray = `    const imagesToLoad = [
      "/assets/arch2.png",
      "/assets/couple_2.png",
      "/assets/tree.png",
      "/assets/rings.png",
      "/assets/MensOutfits.png",
      "/assets/WomensOutfits.png",
    ];`;

content = content.replace(oldArray, newArray);
fs.writeFileSync('src/App.tsx', content);
