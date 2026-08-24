import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Add Leaf to imports if not there
if (!content.includes('Leaf,')) {
    content = content.replace(/Feather,/, 'Feather,\n  Leaf,');
}

// 2. Replace the watermark
const watermarkRegex = /<div className=\{\`absolute \$\{isEven \? "right-\[-10px\] md:right-\[-15px\]" : "left-\[-10px\] md:left-\[-15px\]"\} top-1\/2 -translate-y-1\/2 text-\[80px\] md:text-\[100px\] font-script text-amber-900\/\[0\.04\] pointer-events-none select-none z-0 leading-none overflow-hidden\`\}>[\s\S]*?<\/div>/;

const newWatermark = `<div className={\`absolute \${isEven ? "right-10 md:right-16" : "left-10 md:left-16"} top-1/2 -translate-y-1/2 flex items-center justify-center text-amber-900/[0.05] pointer-events-none select-none z-0\`}>
          <div className="relative flex items-center justify-center scale-[4] md:scale-[5] [&_svg]:!stroke-[1.5px]">
            <Leaf size={20} className="absolute -left-4 -top-3 -rotate-45 opacity-50" />
            <Leaf size={20} className="absolute -right-4 -bottom-3 rotate-[135deg] opacity-50" />
            {card.icon}
          </div>
        </div>`;

content = content.replace(watermarkRegex, newWatermark);
fs.writeFileSync('src/App.tsx', content);
