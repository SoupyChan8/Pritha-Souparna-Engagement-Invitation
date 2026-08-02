import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');
content = content.replace(/<motion\.div\s+className="force-gpu"([\s\S]*?)className="/g, '<motion.div$1className="force-gpu ');
fs.writeFileSync('src/App.tsx', content);
