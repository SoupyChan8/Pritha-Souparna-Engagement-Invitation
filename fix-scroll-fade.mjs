import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const oldBlock1 = `      const CROSSFADE_POINT = 0.66; // Just after cards stack up
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
      }`;

const newBlock1 = `      const CROSSFADE_POINT = 0.66; // Just after cards stack up

      if (latest >= CROSSFADE_POINT && activeTrackRef.current === 'intro') {
        activeTrackRef.current = 'hook';
        doCrossfade(intro, hook, 'hook', intro.volume, 0, 0, 1);
      } else if (latest < CROSSFADE_POINT && activeTrackRef.current === 'hook') {
        activeTrackRef.current = 'intro';
        doCrossfade(hook, intro, 'intro', hook.volume, 0, 0, 1);
      }`;

const oldBlock2 = `       const CROSSFADE_POINT = 0.66;
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
       }`;

const newBlock2 = `       const CROSSFADE_POINT = 0.66;

       let currentAudio;
       if (latest >= CROSSFADE_POINT) {
           activeTrackRef.current = 'hook';
           intro.volume = 0;
           hook.volume = 1;
           currentAudio = hook;
       } else {
           activeTrackRef.current = 'intro';
           intro.volume = 1;
           hook.volume = 0;
           currentAudio = intro;
       }`;

content = content.replace(oldBlock1, newBlock1);
content = content.replace(oldBlock2, newBlock2);

fs.writeFileSync('src/App.tsx', content);
