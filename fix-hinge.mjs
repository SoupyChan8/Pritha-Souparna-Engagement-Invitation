import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');
content = content.replace(/\{\/\* Hinge cover to prevent rendering gap \*\/\}\s*<div\s*className="absolute top-0 inset-x-0 h-\[2px\] bg-\[#fdfbf7\] backface-hidden"\s*style=\{\{ transform: "translateY\(-1px\) translateZ\(0.2px\)" \}\}\s*><\/div>\s*<div\s*className="absolute top-0 inset-x-0 h-\[2px\] bg-\[#0f172a\] backface-hidden"\s*style=\{\{\s*transform:\s*"translateY\(-1px\) rotateX\(180deg\) translateZ\(0.2px\)",\s*\}\}\s*><\/div>/, '');
fs.writeFileSync('src/App.tsx', content);
