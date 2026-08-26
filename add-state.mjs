import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const oldState = `  const [isReady, setIsReady] = useState(false);`;
const newState = `  const [isReady, setIsReady] = useState(false);\n  const [isInfoOpen, setIsInfoOpen] = useState(false);`;

content = content.replace(oldState, newState);
fs.writeFileSync('src/App.tsx', content);
