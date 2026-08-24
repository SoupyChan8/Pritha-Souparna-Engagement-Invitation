import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Remove activeTrack state
content = content.replace("  const [activeTrack, setActiveTrack] = useState<'intro' | 'hook'>('intro');\n", "");

// Find the old useEffect block and replace it
const oldEffectRegex = /  useEffect\(\(\) => \{\n    const intro = introAudioRef\.current;[\s\S]*?\}, \[isPlaying, activeTrack\]\);/;

const newAudioLogic = `  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      const intro = introAudioRef.current;
      const hook = hookAudioRef.current;
      if (!intro || !hook) return;

      let targetIntroVol = 1;
      if (latest > 0.41 && latest <= 0.65) {
        targetIntroVol = 1 - ((latest - 0.41) / (0.65 - 0.41));
      } else if (latest > 0.65) {
        targetIntroVol = 0;
      }

      let targetHookVol = 0;
      if (latest > 0.64 && latest <= 0.66) {
         targetHookVol = (latest - 0.64) / (0.66 - 0.64);
      } else if (latest > 0.66) {
         targetHookVol = 1;
      }

      intro.volume = targetIntroVol;
      hook.volume = targetHookVol;

      if (isPlaying) {
        if (targetIntroVol > 0 && intro.paused) {
            intro.play().catch(()=>{});
        } else if (targetIntroVol === 0 && !intro.paused) {
            intro.pause();
        }

        if (targetHookVol > 0 && hook.paused) {
            hook.play().catch(()=>{});
        } else if (targetHookVol === 0 && !hook.paused) {
            hook.pause();
            if (latest < 0.64) {
               hook.currentTime = 0;
            }
        }
      }
    });
  }, [scrollYProgress, isPlaying]);

  useEffect(() => {
    const intro = introAudioRef.current;
    const hook = hookAudioRef.current;
    if (!intro || !hook) return;

    if (isPlaying) {
       const latest = scrollYProgress.get();
       
       let targetIntroVol = 1;
       if (latest > 0.41 && latest <= 0.65) {
         targetIntroVol = 1 - ((latest - 0.41) / (0.65 - 0.41));
       } else if (latest > 0.65) {
         targetIntroVol = 0;
       }

       let targetHookVol = 0;
       if (latest > 0.64 && latest <= 0.66) {
          targetHookVol = (latest - 0.64) / (0.66 - 0.64);
       } else if (latest > 0.66) {
          targetHookVol = 1;
       }

       intro.volume = targetIntroVol;
       hook.volume = targetHookVol;

       const playPromises = [];
       if (targetIntroVol > 0) playPromises.push(intro.play());
       if (targetHookVol > 0) playPromises.push(hook.play());

       playPromises.forEach(p => p && p.catch(e => {
            console.warn("Autoplay blocked:", e);
            const playOnInteract = () => {
              if (isPlaying) {
                if (targetIntroVol > 0) intro.play().catch(()=>{});
                if (targetHookVol > 0) hook.play().catch(()=>{});
              }
              window.removeEventListener("click", playOnInteract);
              window.removeEventListener("touchstart", playOnInteract);
              window.removeEventListener("scroll", playOnInteract);
            };
            window.addEventListener("click", playOnInteract);
            window.addEventListener("touchstart", playOnInteract);
            window.addEventListener("scroll", playOnInteract, { once: true });
        }));
    } else {
       intro.pause();
       hook.pause();
    }
  }, [isPlaying]);`;

content = content.replace(oldEffectRegex, newAudioLogic);

// Remove the other old useEffect that had activeTrack
const oldScrollEffectRegex = /  useEffect\(\(\) => \{\n    return scrollYProgress\.on\("change", \(latest\) => \{\n      if \(latest >= 0\.65 && activeTrack === 'intro'\) \{\n        setActiveTrack\('hook'\);\n      \} else if \(latest < 0\.65 && activeTrack === 'hook'\) \{\n        setActiveTrack\('intro'\);\n      \}\n    \}\);\n  \}, \[scrollYProgress, activeTrack\]\);/g;

content = content.replace(oldScrollEffectRegex, "");

fs.writeFileSync('src/App.tsx', content);
