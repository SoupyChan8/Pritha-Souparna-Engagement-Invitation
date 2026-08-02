import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');
content = content.replace(/alt="Arch Shadow"\n\s*className="absolute bottom-\[6%\] md:bottom-\[6%\] left-1\/2 w-\[525px\] md:w-\[900px\] max-w-\[130vw\] md:max-w-none pointer-events-none z-\[12\] blur-\[2px\] opacity-80"\n\s*className="absolute bottom-\[6%\] md:bottom-\[6%\] left-1\/2 w-\[525px\] md:w-\[900px\] max-w-\[130vw\] md:max-w-none pointer-events-none z-\[12\]"/, 'alt="Arch Shadow"\n              className="absolute bottom-[6%] md:bottom-[6%] left-1/2 w-[525px] md:w-[900px] max-w-[130vw] md:max-w-none pointer-events-none z-[12] blur-[2px] opacity-80"');
fs.writeFileSync('src/App.tsx', content);
