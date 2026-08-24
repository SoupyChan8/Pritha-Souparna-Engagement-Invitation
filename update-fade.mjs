import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const oldLogic1 = `      let targetIntroVol = 1;
      if (latest > 0.41 && latest <= 0.65) {
        targetIntroVol = 1 - ((latest - 0.41) / (0.65 - 0.41));
      } else if (latest > 0.65) {
        targetIntroVol = 0;
      }

      let targetHookVol = 0;
      if (latest > 0.64 && latest <= 0.66) {
         targetHookVol = (latest - 0.64) / (0.66 - 0.64);
      } else if (latest > 0.66) {
         targetHookVol = 1;
      }`;

const newLogic = `      let targetIntroVol = 1;
      if (latest > 0.63 && latest <= 0.66) {
        targetIntroVol = 1 - ((latest - 0.63) / (0.66 - 0.63));
      } else if (latest > 0.66) {
        targetIntroVol = 0;
      }

      let targetHookVol = 0;
      if (latest > 0.64 && latest <= 0.65) {
         targetHookVol = (latest - 0.64) / (0.65 - 0.64);
      } else if (latest > 0.65) {
         targetHookVol = 1;
      }`;

content = content.replace(oldLogic1, newLogic); // First instance

const oldLogic2 = `       let targetIntroVol = 1;
       if (latest > 0.41 && latest <= 0.65) {
         targetIntroVol = 1 - ((latest - 0.41) / (0.65 - 0.41));
       } else if (latest > 0.65) {
         targetIntroVol = 0;
       }

       let targetHookVol = 0;
       if (latest > 0.64 && latest <= 0.66) {
          targetHookVol = (latest - 0.64) / (0.66 - 0.64);
       } else if (latest > 0.66) {
          targetHookVol = 1;
       }`;

const newLogic2 = `       let targetIntroVol = 1;
       if (latest > 0.63 && latest <= 0.66) {
         targetIntroVol = 1 - ((latest - 0.63) / (0.66 - 0.63));
       } else if (latest > 0.66) {
         targetIntroVol = 0;
       }

       let targetHookVol = 0;
       if (latest > 0.64 && latest <= 0.65) {
          targetHookVol = (latest - 0.64) / (0.65 - 0.64);
       } else if (latest > 0.65) {
          targetHookVol = 1;
       }`;

content = content.replace(oldLogic2, newLogic2); // Second instance

fs.writeFileSync('src/App.tsx', content);
