import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const oldPreload = `    let loadedCount = 0;

    imagesToLoad.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imagesToLoad.length) {
          setIsReady(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === imagesToLoad.length) {
          setIsReady(true);
        }
      };
    });`;

const newPreload = `    Promise.all([
      document.fonts.ready,
      ...imagesToLoad.map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = resolve;
          })
      ),
    ]).then(() => {
      setIsReady(true);
    });`;

content = content.replace(oldPreload, newPreload);
fs.writeFileSync('src/App.tsx', content);
