import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Insert refs
content = content.replace(
  '  const introAudioRef = useRef<HTMLAudioElement>(null);\\n  const hookAudioRef = useRef<HTMLAudioElement>(null);',
  '  const introAudioRef = useRef<HTMLAudioElement>(null);\\n  const hookAudioRef = useRef<HTMLAudioElement>(null);\\n  const activeTrackRef = useRef<"intro" | "hook">("intro");\\n  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);'
);

// Find the start and end of the old audio logic
const oldEffectRegex = /  useEffect\(\(\) => \{\n    return scrollYProgress\.on\("change", \(latest\) => \{[\s\S]*?\}, \[isPlaying\]\);/g;

const newAudioLogic = `  const doCrossfade = (fadeOutAudio, fadeInAudio, targetTrack) => {
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    fadeInAudio.volume = 0;
    if (targetTrack === 'hook') {
        fadeInAudio.currentTime = 0; 
    }
    fadeInAudio.play().catch(()=>{});

    const steps = 20;
    const intervalMs = 50; 
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        fadeOutAudio.volume = Math.max(0, 1 - progress);
        fadeInAudio.volume = Math.min(1, progress);

        if (currentStep >= steps) {
            clearInterval(fadeIntervalRef.current);
            fadeOutAudio.pause();
            fadeOutAudio.volume = 0;
            fadeInAudio.volume = 1;
        }
    }, intervalMs);
  };

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      if (!isPlaying) return;

      const intro = introAudioRef.current;
      const hook = hookAudioRef.current;
      if (!intro || !hook) return;

      const CROSSFADE_POINT = 0.66; // Just after cards stack up

      if (latest >= CROSSFADE_POINT && activeTrackRef.current === 'intro') {
        activeTrackRef.current = 'hook';
        doCrossfade(intro, hook, 'hook');
      } else if (latest < CROSSFADE_POINT && activeTrackRef.current === 'hook') {
        activeTrackRef.current = 'intro';
        doCrossfade(hook, intro, 'intro');
      }
    });
  }, [scrollYProgress, isPlaying]);

  useEffect(() => {
    const intro = introAudioRef.current;
    const hook = hookAudioRef.current;
    if (!intro || !hook) return;

    if (isPlaying) {
       const currentAudio = activeTrackRef.current === 'intro' ? intro : hook;
       currentAudio.volume = 1;
       currentAudio.play().catch(e => {
          console.warn("Autoplay blocked:", e);
          const playOnInteract = () => {
            if (isPlaying) currentAudio.play().catch(()=>{});
            window.removeEventListener("click", playOnInteract);
            window.removeEventListener("touchstart", playOnInteract);
            window.removeEventListener("scroll", playOnInteract);
          };
          window.addEventListener("click", playOnInteract);
          window.addEventListener("touchstart", playOnInteract);
          window.addEventListener("scroll", playOnInteract, { once: true });
       });
    } else {
       intro.pause();
       hook.pause();
       if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    }
  }, [isPlaying]);`;

content = content.replace(oldEffectRegex, newAudioLogic);

fs.writeFileSync('src/App.tsx', content);
