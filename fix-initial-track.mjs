import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const oldEffect = `  useEffect(() => {
    const intro = introAudioRef.current;
    const hook = hookAudioRef.current;
    if (!intro || !hook) return;

    if (isPlaying) {
       const currentAudio = activeTrackRef.current === 'intro' ? intro : hook;
       currentAudio.volume = 1;
       currentAudio.play().catch(e => {`;

const newEffect = `  useEffect(() => {
    const intro = introAudioRef.current;
    const hook = hookAudioRef.current;
    if (!intro || !hook) return;

    if (isPlaying) {
       // Check current scroll position to play the correct track immediately
       const latest = scrollYProgress.get();
       const CROSSFADE_POINT = 0.66;
       if (latest >= CROSSFADE_POINT) {
           activeTrackRef.current = 'hook';
       } else {
           activeTrackRef.current = 'intro';
       }

       const currentAudio = activeTrackRef.current === 'intro' ? intro : hook;
       currentAudio.volume = 1;
       currentAudio.play().catch(e => {`;

content = content.replace(oldEffect, newEffect);
fs.writeFileSync('src/App.tsx', content);
