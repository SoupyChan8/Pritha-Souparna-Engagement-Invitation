import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const regex = /<div className="absolute inset-1 border border-amber-600\/10 rounded-lg pointer-events-none" \/>/;
const replacement = `<div className="absolute inset-1 border border-amber-600/10 rounded-lg pointer-events-none" />
        <div className={\`absolute \${isEven ? "right-2 md:right-4" : "left-2 md:left-4"} top-1/2 -translate-y-1/2 text-5xl md:text-6xl font-script text-amber-900/[0.07] pointer-events-none select-none z-0\`}>
          {String(index + 1).padStart(2, '0')}
        </div>`;

content = content.replace(regex, replacement);
fs.writeFileSync('src/App.tsx', content);
