import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const regex = /  const doCrossfade = \([\s\S]*?\}, \[isPlaying\]\);/g;

const newLogic = `  const doCrossfade = (fadeOutAudio, fadeInAudio, targetTrack, startVolFadeOut, endVolFadeOut, startVolFadeIn, endVolFadeIn) => {
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    fadeOutAudio.volume = startVolFadeOut;
    fadeInAudio.volume = startVolFadeIn;
    
    if (targetTrack === 'hook') {
        fadeInAudio.currentTime = 0; 
    }
    fadeInAudio.play().catch(()=>{});

    const steps = 30; // 30 steps * 50ms = 1.5 seconds
    const intervalMs = 50; 
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        fadeOutAudio.volume = Math.max(0, Math.min(1, startVolFadeOut + (endVolFadeOut - startVolFadeOut) * progress));
        fadeInAudio.volume = Math.max(0, Math.min(1, startVolFadeIn + (endVolFadeIn - startVolFadeIn) * progress));

        if (currentStep >= steps) {
            clearInterval(fadeIntervalRef.current);
            fadeIntervalRef.current = null;
            if (endVolFadeOut === 0) {
                fadeOutAudio.pause();
            }
            fadeOutAudio.volume = endVolFadeOut;
            fadeInAudio.volume = endVolFadeIn;
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
      const FADE_START_POINT = 0.56; // Last card stacks up

      if (latest >= CROSSFADE_POINT && activeTrackRef.current === 'intro') {
        activeTrackRef.current = 'hook';
        doCrossfade(intro, hook, 'hook', intro.volume, 0, 0, 1);
      } else if (latest < CROSSFADE_POINT && activeTrackRef.current === 'hook') {
        activeTrackRef.current = 'intro';
        doCrossfade(hook, intro, 'intro', hook.volume, 0, 0, 0.5);
      }

      // Handle the 100% to 50% fade based on scroll
      if (activeTrackRef.current === 'intro' && !fadeIntervalRef.current) {
         if (latest <= FADE_START_POINT) {
             intro.volume = 1;
         } else if (latest > FADE_START_POINT && latest <= CROSSFADE_POINT) {
             intro.volume = Math.max(0, Math.min(1, 1 - 0.5 * ((latest - FADE_START_POINT) / (CROSSFADE_POINT - FADE_START_POINT))));
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
       const CROSSFADE_POINT = 0.66;
       const FADE_START_POINT = 0.56;

       let currentAudio;
       if (latest >= CROSSFADE_POINT) {
           activeTrackRef.current = 'hook';
           intro.volume = 0;
           hook.volume = 1;
           currentAudio = hook;
       } else {
           activeTrackRef.current = 'intro';
           let vol = 1;
           if (latest > FADE_START_POINT && latest <= CROSSFADE_POINT) {
               vol = 1 - 0.5 * ((latest - FADE_START_POINT) / (CROSSFADE_POINT - FADE_START_POINT));
           }
           intro.volume = vol;
           hook.volume = 0;
           currentAudio = intro;
       }
       
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
       if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
       }
    }
  }, [isPlaying]);`;

content = content.replace(regex, newLogic);
fs.writeFileSync('src/App.tsx', content);
