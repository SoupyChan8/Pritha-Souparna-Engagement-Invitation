import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');
content = content.replace(/className="absolute bottom-\[6%\] md:bottom-\[6%\] left-1\/2 w-\[525px\] md:w-\[900px\] max-w-\[130vw\] md:max-w-none pointer-events-none z-\[12\] blur-\[100px\] opacity-80"/g, 'className="absolute bottom-[6%] md:bottom-[6%] left-1/2 w-[525px] md:w-[900px] max-w-[130vw] md:max-w-none pointer-events-none z-[12]"');
content = content.replace(/filter: "brightness\(0\)",/g, 'filter: "brightness(0) blur(6px)",');
fs.writeFileSync('src/App.tsx', content);
