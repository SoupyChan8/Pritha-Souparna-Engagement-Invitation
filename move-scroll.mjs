import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const scrollDec = `  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });`;

content = content.replace(scrollDec + "\n", "");
content = content.replace(scrollDec, "");

const insertPoint = `  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {`;

content = content.replace(insertPoint, scrollDec + "\n\n" + insertPoint);

fs.writeFileSync('src/App.tsx', content);
