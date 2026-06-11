const https = require('https');
const fs = require('fs');
const path = require('path');

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
      }
    }, (response) => {
      // Follow redirects
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        download(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode >= 400) {
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        return;
      }

      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
};

const main = async () => {
    fs.mkdirSync('public/assets', { recursive: true });
    
    const downloads = [
        { url: 'https://png.pngtree.com/png-clipart/20250107/original/pngtree-wedding-gate-illustration-png-image_19840264.png', name: 'public/assets/arch.png' },
        { url: 'https://rosepng.com/wp-content/uploads/elementor/thumbs/s11728_wedding_couple_isolated_on_white_background_-v_6-1_1a955d4d-0a3d-4f9e-9235-f2f73142f0ea_1-photoroom-r9y6ezfa3twr7a5ahf9yfmjl25av9tlob3041bxdwg.png', name: 'public/assets/couple.png' },
        { url: 'https://static.vecteezy.com/system/resources/previews/023/271/274/non_2x/coconut-tree-png.png', name: 'public/assets/tree.png' },
        { url: 'https://static.vecteezy.com/system/resources/thumbnails/023/271/274/small/coconut-tree-png-illustrations-free-png.png', name: 'public/assets/tree_small.png' },
    ];
    
    for (const d of downloads) {
        try {
            await download(d.url, d.name);
            console.log(`Downloaded ${d.name}`);
        } catch (e) { 
            console.error(e.message); 
        }
    }
}

main();
