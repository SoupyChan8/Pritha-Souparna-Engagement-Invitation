import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');
const searchStr = `  const gateScale = useTransform(scrollYProgress, [0.62, 0.68], [1, 4]);`;
const newTransforms = `  const gateScale = useTransform(scrollYProgress, [0.62, 0.68], [1, 4]);
  const cardsTranslateY = useTransform(scrollYProgress, [0.54, 0.62], ["0vh", "-70vh"]);
`;
content = content.replace(searchStr, newTransforms);
fs.writeFileSync('src/App.tsx', content);
