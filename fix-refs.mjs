import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const hookRef = '  const hookAudioRef = useRef<HTMLAudioElement>(null);';
const replacements = '  const hookAudioRef = useRef<HTMLAudioElement>(null);\\n  const activeTrackRef = useRef<"intro" | "hook">("intro");\\n  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);';

content = content.replace(hookRef, replacements);
fs.writeFileSync('src/App.tsx', content);
