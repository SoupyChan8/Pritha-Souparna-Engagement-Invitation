import React, { useRef, useEffect, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { InvitationPDF } from "./PdfDocument";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useMotionValue,
  useSpring,
} from "motion/react";
import {
  MapPin,
  Calendar,
  Heart,
  Download,
  GlassWater,
  Utensils,
  Music,
  Sparkles,
  Volume2,
  VolumeX,
  Feather,
} from "lucide-react";
import { Fireworks } from "@fireworks-js/react";

const CustomSailboat = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 200 200"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    <g className="animate-[float_4s_ease-in-out_infinite] origin-bottom opacity-100">
      {/* Back Sail */}
      <path
        d="M102,25 Q135,60 140,125 L104,125 Z"
        fill="#cbd5e1"
        stroke="currentColor"
        strokeWidth="1"
      />
      {/* Mast */}
      <line
        x1="100"
        y1="20"
        x2="100"
        y2="130"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* Main Sail */}
      <path
        d="M96,20 Q65,60 55,125 L96,125 Z"
        fill="#ffffff"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Flag - elegant miniature wave ribbon */}
      <path
        d="M100,16 Q112,18 116,14 Q108,22 100,24 Z"
        fill="#ef4444"
        stroke="currentColor"
        strokeWidth="0.5"
        className="animate-[flutter_2.5s_linear_infinite]"
        style={{ transformOrigin: "100px 18px" }}
      />
      {/* Hull Base */}
      <path
        d="M35,130 L165,130 L150,144 L50,144 Z"
        fill="#1e293b"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* Delicate ocean ground lines reflection */}
      <line
        x1="20"
        y1="149"
        x2="180"
        y2="149"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeDasharray="6,4"
        opacity="0.6"
      />
      <line
        x1="45"
        y1="153"
        x2="155"
        y2="153"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeDasharray="3,3"
        opacity="0.4"
      />
    </g>
  </svg>
);

const CustomPalmTree = ({
  className,
  flip,
}: {
  className?: string;
  flip?: boolean;
}) => (
  <svg
    viewBox="0 0 400 500"
    className={className}
    style={{
      ...(flip ? { transform: "scaleX(-1)" } : {}),
      transformOrigin: "bottom center",
    }}
    preserveAspectRatio="xMidYMax meet"
  >
    <defs>
      <linearGradient id="trunkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#451a03" />
        <stop offset="50%" stopColor="#78350f" />
        <stop offset="100%" stopColor="#451a03" />
      </linearGradient>
    </defs>
    <g
      className="animate-[sway_5s_ease-in-out_infinite]"
      style={{ transformOrigin: "200px 500px" }}
    >
      {/* Trunk main structure */}
      <path
        d="M220,500 C200,300 240,150 250,80 L230,75 C210,150 170,300 190,500 Z"
        fill="url(#trunkGrad)"
      />

      {/* Trunk lines for texture */}
      <path
        d="M195,450 Q205,455 215,450 M190,400 Q205,410 220,400 M195,350 Q205,360 225,350 M195,300 Q210,310 230,300 M200,250 Q215,260 235,250 M205,200 Q220,210 240,200 M215,150 Q225,160 242,150 M223,100 Q233,110 248,100"
        stroke="#451a03"
        strokeWidth="3"
        fill="none"
        opacity="0.6"
      />

      {/* Fronds Container */}
      <g transform="translate(240, 80)">
        {/* Back Fronds */}
        <path d="M0,0 Q-30,-60 -80,-80 Q-40,-50 -10,-10 Z" fill="#14532d" />
        <path d="M0,0 Q30,-70 70,-90 Q40,-50 10,-10 Z" fill="#14532d" />
        <path d="M0,0 Q80,-20 120,10 Q60,10 10,-5 Z" fill="#14532d" />

        {/* Coconuts */}
        <circle cx="-15" cy="5" r="12" fill="#422006" />
        <circle cx="10" cy="12" r="14" fill="#78350f" />
        <circle cx="0" cy="20" r="13" fill="#422006" />

        {/* Mid Fronds */}
        <path d="M0,0 Q-80,-20 -130,20 Q-70,-5 -15,5 Z" fill="#166534" />
        <path d="M0,0 Q-60,40 -90,80 Q-40,30 -5,10 Z" fill="#15803d" />
        <path d="M0,0 Q50,40 80,90 Q40,30 10,10 Z" fill="#166534" />
        <path d="M0,0 Q100,20 140,50 Q70,20 15,5 Z" fill="#15803d" />

        {/* Front Fronds (lightest) */}
        <path d="M0,0 Q-50,-40 -100,-40 Q-50,-20 -10,0 Z" fill="#22c55e" />
        <path d="M0,0 Q-20,60 -40,110 Q-10,50 0,10 Z" fill="#4ade80" />
        <path d="M0,0 Q20,60 50,110 Q10,50 5,10 Z" fill="#22c55e" />
        <path d="M0,0 Q50,-40 90,-50 Q40,-20 10,0 Z" fill="#4ade80" />
      </g>
    </g>
  </svg>
);

const Countdown = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex gap-3 md:gap-4 justify-center items-center my-6 z-10 w-full px-2">
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Mins", value: timeLeft.minutes },
        { label: "Secs", value: timeLeft.seconds },
      ].map((item, idx) => (
        <div key={idx} className="flex flex-col items-center">
          <div className="text-xl md:text-3xl font-serif text-amber-900 border border-amber-900/15 rounded-md bg-[#fdfbf7] w-12 h-14 md:w-16 md:h-16 flex items-center justify-center shadow-sm">
            {item.value.toString().padStart(2, "0")}
          </div>
          <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-amber-900/60 mt-2 font-editorial font-semibold">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
};

const AnimatedCard = ({
  progress,
  card,
  index,
}: {
  key?: React.Key;
  progress: MotionValue<number>;
  card: { date: string; time: string; name: string; icon: React.ReactNode };
  index: number;
}) => {
  const startIn = 0.48 + index * 0.015;
  const endIn = startIn + 0.02;
  const opacity = useTransform(
    progress,
    [startIn, endIn, 0.62, 0.65],
    [0, 1, 1, 0],
  );
  const y = useTransform(progress, [startIn, endIn], ["40px", "0px"]);

  return (
    <motion.div
      style={{
        opacity,
        y,
        pointerEvents: useTransform(opacity, (v) =>
          v > 0.01 ? "auto" : "none",
        ) as any,
      }}
      className="w-full h-full"
    >
      <motion.div
        whileHover={{ scale: 1.04, y: -6 }}
        whileTap={{ scale: 0.98 }}
        className="bg-[#fdfbf7] rounded-xl p-4 shadow-md hover:shadow-xl border border-amber-900/15 flex flex-col items-center justify-center text-center gap-2 h-full cursor-pointer transition-shadow duration-300 relative overflow-hidden"
      >
        <div className="absolute inset-1 border border-amber-600/10 rounded-lg pointer-events-none" />
        <div className="text-amber-700 mb-1 scale-105">{card.icon}</div>
        <div className="font-editorial text-sm md:text-base font-semibold tracking-[0.15em] text-amber-900 uppercase">
          {card.time}
        </div>
        <div className="w-8 h-px bg-amber-900/20 my-1 md:my-1.5" />
        <div className="font-serif text-[13px] md:text-sm text-slate-800 font-medium leading-snug">
          {card.name}
        </div>
      </motion.div>
    </motion.div>
  );
};

const FlappingBird = ({
  delay = 0,
  startX,
  startY,
  endX,
  endY,
  scale = 1,
  duration = 20,
  flip = false,
}: {
  delay?: number;
  startX: string;
  startY: string;
  endX: string;
  endY: string;
  scale?: number;
  duration?: number;
  flip?: boolean;
}) => {
  // Flap animation logic
  const flapDuration = 0.8 + (delay % 0.4); // pseudo-random deterministic

  return (
    <motion.div
      className="absolute text-slate-800/40 mix-blend-multiply"
      style={{
        left: 0,
        top: 0,
        scaleX: flip ? -scale : scale,
        scaleY: scale,
        willChange: "transform",
      }}
      animate={{
        x: [startX, endX],
        y: [startY, endY],
      }}
      transition={{
        x: { duration, repeat: Infinity, ease: "linear", delay },
        y: { duration, repeat: Infinity, ease: "linear", delay },
      }}
    >
      <motion.div
        animate={{ y: [0, -15, 0, 15, 0] }}
        transition={{
          duration: duration / 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay / 2,
        }}
      >
        <svg
          width="40"
          height="20"
          viewBox="0 0 40 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M 20 10 Q 10 0 2 6">
            <animate
              attributeName="d"
              values="M 20 10 Q 10 0 2 6; M 20 10 Q 10 16 2 12; M 20 10 Q 10 0 2 6"
              dur={`${flapDuration}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
            />
          </path>
          <path d="M 20 10 Q 30 0 38 6">
            <animate
              attributeName="d"
              values="M 20 10 Q 30 0 38 6; M 20 10 Q 30 16 38 12; M 20 10 Q 30 0 38 6"
              dur={`${flapDuration}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </motion.div>
    </motion.div>
  );
};

const BirdFlock = ({ progress }: { progress: MotionValue<number> }) => {
  // Fade out around sunset (when gateOpacity comes in, around 0.4 - 0.5)
  const flockOpacity = useTransform(progress, [0, 0.35, 0.45], [1, 1, 0]);

  return (
    <motion.div
      style={{ opacity: flockOpacity }}
      className="absolute inset-0 pointer-events-none overflow-hidden z-[11] block"
    >
      {/* Flock 1: High and slow, right to left, slightly dipping down */}
      <FlappingBird
        startX="110vw"
        startY="8vh"
        endX="-20vw"
        endY="15vh"
        scale={0.4}
        duration={35}
        delay={0}
      />
      <FlappingBird
        startX="112vw"
        startY="9.5vh"
        endX="-18vw"
        endY="16.5vh"
        scale={0.35}
        duration={35}
        delay={1.2}
      />
      <FlappingBird
        startX="115vw"
        startY="7vh"
        endX="-15vw"
        endY="14vh"
        scale={0.45}
        duration={35}
        delay={2.5}
      />
      <FlappingBird
        startX="108vw"
        startY="10vh"
        endX="-22vw"
        endY="17vh"
        scale={0.38}
        duration={35}
        delay={0.8}
      />
      <FlappingBird
        startX="118vw"
        startY="8.5vh"
        endX="-12vw"
        endY="15.5vh"
        scale={0.42}
        duration={35}
        delay={3}
      />
      <FlappingBird
        startX="105vw"
        startY="9vh"
        endX="-25vw"
        endY="16vh"
        scale={0.4}
        duration={35}
        delay={4}
      />
      <FlappingBird
        startX="114vw"
        startY="11vh"
        endX="-16vw"
        endY="18vh"
        scale={0.37}
        duration={35}
        delay={1.8}
      />
      <FlappingBird
        startX="109vw"
        startY="7.5vh"
        endX="-21vw"
        endY="14.5vh"
        scale={0.44}
        duration={35}
        delay={2.1}
      />

      {/* Flock 2: Mid level, left to right, rising slightly */}
      <FlappingBird
        startX="-10vw"
        startY="35vh"
        endX="120vw"
        endY="18vh"
        scale={0.5}
        duration={28}
        delay={5}
        flip
      />
      <FlappingBird
        startX="-12vw"
        startY="36vh"
        endX="118vw"
        endY="19vh"
        scale={0.48}
        duration={28}
        delay={5.5}
        flip
      />
      <FlappingBird
        startX="-15vw"
        startY="34vh"
        endX="115vw"
        endY="17vh"
        scale={0.55}
        duration={28}
        delay={6.2}
        flip
      />
      <FlappingBird
        startX="-8vw"
        startY="38vh"
        endX="122vw"
        endY="21vh"
        scale={0.45}
        duration={28}
        delay={4.8}
        flip
      />
      <FlappingBird
        startX="-13vw"
        startY="37.5vh"
        endX="117vw"
        endY="20.5vh"
        scale={0.52}
        duration={28}
        delay={5.8}
        flip
      />
      <FlappingBird
        startX="-18vw"
        startY="35.5vh"
        endX="112vw"
        endY="18.5vh"
        scale={0.5}
        duration={28}
        delay={6.8}
        flip
      />
      <FlappingBird
        startX="-20vw"
        startY="36.5vh"
        endX="110vw"
        endY="19.5vh"
        scale={0.48}
        duration={28}
        delay={7.5}
        flip
      />
      <FlappingBird
        startX="-16vw"
        startY="33vh"
        endX="114vw"
        endY="16vh"
        scale={0.51}
        duration={28}
        delay={6.5}
        flip
      />
      <FlappingBird
        startX="-22vw"
        startY="37vh"
        endX="108vw"
        endY="20vh"
        scale={0.47}
        duration={28}
        delay={8}
        flip
      />

      {/* Flock 3: Lower, right to left, passing closely and dynamically */}
      <FlappingBird
        startX="120vw"
        startY="55vh"
        endX="-30vw"
        endY="45vh"
        scale={0.8}
        duration={18}
        delay={2}
      />
      <FlappingBird
        startX="125vw"
        startY="52vh"
        endX="-25vw"
        endY="42vh"
        scale={0.75}
        duration={18}
        delay={2.5}
      />
      <FlappingBird
        startX="118vw"
        startY="58vh"
        endX="-32vw"
        endY="48vh"
        scale={0.85}
        duration={18}
        delay={1.5}
      />
      <FlappingBird
        startX="130vw"
        startY="56vh"
        endX="-20vw"
        endY="46vh"
        scale={0.7}
        duration={18}
        delay={3}
      />
      <FlappingBird
        startX="122vw"
        startY="57vh"
        endX="-28vw"
        endY="47vh"
        scale={0.82}
        duration={18}
        delay={2.8}
      />
      <FlappingBird
        startX="128vw"
        startY="53vh"
        endX="-22vw"
        endY="43vh"
        scale={0.78}
        duration={18}
        delay={3.5}
      />
      <FlappingBird
        startX="135vw"
        startY="55vh"
        endX="-15vw"
        endY="45vh"
        scale={0.72}
        duration={18}
        delay={4}
      />
      <FlappingBird
        startX="132vw"
        startY="58vh"
        endX="-18vw"
        endY="48vh"
        scale={0.76}
        duration={18}
        delay={3.2}
      />
    </motion.div>
  );
};

const GlobalParticles = ({ progress }: { progress: MotionValue<number> }) => {
  // Fade stars in when night scene
  const starOpacity = useTransform(progress, [0.61, 0.69, 1], [0, 1, 1]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Stars */}
      <motion.div
        style={{ opacity: starOpacity, position: "absolute", inset: 0 }}
      >
        {[...Array(60)].map((_, i) => {
          const size = 1 + (i % 3) * 1.5; // Sizes 1, 2.5, 4
          const left = `${(i * 17) % 100}%`;
          const top = `${(i * 23) % 100}%`;
          const duration = `${2.5 + (i % 3)}s`;
          const delay = `${i * 0.2}s`;
          return (
            <div
              key={`star-${i}`}
              className="absolute bg-white rounded-full particle-star"
              style={{
                left,
                top,
                width: `${size}px`,
                height: `${size}px`,
                animationDuration: duration,
                animationDelay: delay,
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
};

const NightFireworks = ({ progress }: { progress: MotionValue<number> }) => {
  const fwOpacity = useTransform(progress, [0.65, 0.655, 1], [0, 1, 1]);

  return (
    <motion.div
      style={{ opacity: fwOpacity }}
      className="absolute inset-x-0 top-[-12.5vh] bottom-[30%] md:bottom-[25%] pointer-events-none z-[12]"
    >
      <Fireworks
        options={{
          opacity: 0.9,
          particles: 60,
          explosion: 7,
          intensity: 40,
          traceLength: 4,
          traceSpeed: 10,
          decay: { min: 0.015, max: 0.03 },
          gravity: 2.5,
          acceleration: 1.02,
          friction: 0.96,
          lineStyle: "round",
          rocketsPoint: { min: 40, max: 60 },
        }}
        style={{
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      />
    </motion.div>
  );
};

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleDownloadPdf = async () => {
    setIsGeneratingPdf(true);
    try {
      const getBase64 = async (url: string) => {
        const response = await fetch(url);
        const blob = await response.blob();
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      };
      
      const mensBase64 = await getBase64("/assets/MensOutfits.png");
      const womensBase64 = await getBase64("/assets/WomensOutfits.png");

      const blob = await pdf(<InvitationPDF mensImg={mensBase64} womensImg={womensBase64} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Pritha_and_Souparna.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  useEffect(() => {
    const imagesToLoad = [
      "/assets/arch2.png",
      "/assets/couple_2.png",
      "/assets/tree.png",
      "/assets/rings.png",
    ];
    let loadedCount = 0;

    imagesToLoad.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imagesToLoad.length) {
          setIsReady(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === imagesToLoad.length) {
          setIsReady(true);
        }
      };
    });
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((e) => {
        console.warn("Autoplay blocked, waiting for user interaction:", e);
        const playOnInteract = () => {
          if (isPlaying) audio.play().catch(() => {});
          window.removeEventListener("click", playOnInteract);
          window.removeEventListener("touchstart", playOnInteract);
          window.removeEventListener("scroll", playOnInteract);
        };
        window.addEventListener("click", playOnInteract);
        window.addEventListener("touchstart", playOnInteract);
        window.addEventListener("scroll", playOnInteract, { once: true });
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const handleStart = async () => {
    try {
      if (
        document.documentElement.requestFullscreen &&
        !document.fullscreenElement
      ) {
        await document.documentElement.requestFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen request failed", err);
    }
    setIsStarted(true);
    setIsPlaying(true);
  };

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Envelope Rotations
  const envelopeRotateY = useTransform(scrollYProgress, [0, 0.05], [0, 180]);
  const flapRotateX = useTransform(scrollYProgress, [0.05, 0.08], [0, 180]);
  // Envelope floats down when wave comes
  const envelopeY = useTransform(
    scrollYProgress,
    [0.08, 0.12],
    ["0vh", "50vh"],
  );
  const envelopeOpacity = useTransform(scrollYProgress, [0.1, 0.12], [1, 0]);
  const envelopeDisplay = useTransform(
    scrollYProgress,
    [0.12, 0.13],
    ["flex", "none"],
  );

  // Background Gradients (Day -> Sunset -> Night -> Night Lit)
  const bgSky = useTransform(
    scrollYProgress,
    [0, 0.4, 0.62, 0.7, 1],
    [
      "linear-gradient(to bottom, #7dd3fc, #bae6fd)",
      "linear-gradient(to bottom, #fcbc6a, #fca5a5)",
      "linear-gradient(to bottom, #0f172a, #1e1b4b)",
      "linear-gradient(to bottom, #1e293b, #312e81)",
      "linear-gradient(to bottom, #1e293b, #312e81)",
    ],
  );

  const bgSun = useTransform(
    scrollYProgress,
    [0, 0.4, 0.64],
    ["#fef08a", "#f97316", "#cbd5e1"],
  );
  const shadowSun = useTransform(
    scrollYProgress,
    [0, 0.4, 0.64],
    [
      "0 0 60px 30px rgba(254, 240, 138, 0.5)",
      "0 0 80px 40px rgba(249, 115, 22, 0.6)",
      "0 0 40px 20px rgba(203, 213, 225, 0.2)",
    ],
  );
  const topSun = useTransform(
    scrollYProgress,
    [0, 0.5, 0.64],
    ["15%", "45%", "80%"],
  );

  const bgOcean = useTransform(
    scrollYProgress,
    [0, 0.4, 0.62, 0.7, 1],
    [
      "linear-gradient(to bottom, #0284c7, #38bdf8)",
      "linear-gradient(to bottom, #c2410c, #fb923c)",
      "linear-gradient(to bottom, #020617, #0f172a)",
      "linear-gradient(to bottom, #0f172a, #1e1b4b)",
      "linear-gradient(to bottom, #0f172a, #1e1b4b)",
    ],
  );

  const bgSand = useTransform(
    scrollYProgress,
    [0, 0.4, 0.62, 0.7, 1],
    [
      "linear-gradient(to bottom, #fde047, #fef08a)",
      "linear-gradient(to bottom, #d97706, #fcd34d)",
      "linear-gradient(to bottom, #1e293b, #0f172a)",
      "linear-gradient(to bottom, #334155, #1e293b)",
      "linear-gradient(to bottom, #334155, #1e293b)",
    ],
  );

  const sandColor = useTransform(
    scrollYProgress,
    [0, 0.4, 0.62, 0.7, 1],
    ["#fde047", "#d97706", "#1e293b", "#334155", "#334155"],
  );

  const sceneFilter = useTransform(
    scrollYProgress,
    [0, 0.4, 0.62, 0.7, 1],
    [
      "brightness(1)",
      "brightness(0.6) sepia(0.3) hue-rotate(-20deg)",
      "brightness(0.25)",
      "brightness(0.8)",
      "brightness(0.8)",
    ],
  );
  const boatFilter = useTransform(
    scrollYProgress,
    [0, 0.4, 0.62, 0.7, 1],
    [
      "brightness(1)",
      "brightness(0.7) sepia(0.5) hue-rotate(-30deg)",
      "brightness(0.2)",
      "brightness(0.6)",
      "brightness(0.6)",
    ],
  );
  const archFilter = useTransform(
    scrollYProgress,
    [0, 0.6, 0.68, 0.72],
    [
      "drop-shadow(0px 0px 0px transparent) brightness(1)",
      "drop-shadow(0px 0px 0px transparent) brightness(0.2)",
      "drop-shadow(0px 0px 30px rgba(253,224,71,0.5)) brightness(1)",
      "drop-shadow(0px 0px 40px rgba(254,240,138,0.8)) brightness(1.2)",
    ],
  );
  const archShadowOpacity = useTransform(
    scrollYProgress,
    [0, 0.45, 0.62, 0.66],
    [0.1, 0.3, 0.4, 0],
  );
  const archShadowScaleY = useTransform(
    scrollYProgress,
    [0, 0.4, 0.64],
    [-0.15, -0.35, -0.8],
  );
  const archShadowSkewX = useTransform(
    scrollYProgress,
    [0, 0.4, 0.64],
    ["-30deg", "-30deg", "-30deg"],
  );

  // Scene Opacities
  const nOp = useTransform(
    scrollYProgress,
    [0.13, 0.15, 0.19, 0.21],
    [0, 1, 1, 0],
  );
  const eOp = useTransform(
    scrollYProgress,
    [0.23, 0.25, 0.29, 0.31],
    [0, 1, 1, 0],
  );
  const vOp = useTransform(
    scrollYProgress,
    [0.33, 0.35, 0.38, 0.4],
    [0, 1, 1, 0],
  );

  // Scene 4: Beach Archway & Sunset
  const gateOpacity = useTransform(
    scrollYProgress,
    [0.41, 0.43, 0.66, 0.69],
    [0, 1, 1, 0],
  );
  // Dramatic zoom effect (simplified without arch)
  const gateScale = useTransform(scrollYProgress, [0.62, 0.68], [1, 4]);
  const gateTextOp = useTransform(
    scrollYProgress,
    [0.41, 0.43, 0.62, 0.65],
    [0, 1, 1, 0],
  );
  const gateTextY = useTransform(
    scrollYProgress,
    [0.41, 0.43, 0.46, 0.485],
    ["45vh", "45vh", "45vh", "8vh"]
  );
  const gateTextScale = useTransform(
    scrollYProgress,
    [0.41, 0.43, 0.46, 0.485],
    [1.4, 1.4, 1.4, 1]
  );

  // Scene 4.5: Couple Night Scene
  const coupleTextOp = useTransform(
    scrollYProgress,
    [0.67, 0.69, 0.72, 0.73],
    [0, 1, 1, 0],
  );
  const coupleImgOp = useTransform(
    scrollYProgress,
    [0.65, 0.68, 1, 1],
    [0, 1, 1, 1],
  );
  const coupleShadowOp = useTransform(
    scrollYProgress,
    [0.65, 0.68, 1, 1],
    [0, 0.1, 0.1, 0.1],
  );

  // Scene 4.75: Be our guest
  const guestOp = useTransform(
    scrollYProgress,
    [0.78, 0.79, 0.81, 0.82],
    [0, 1, 1, 0],
  );

  // Scene 5: Dress code
  const dOp = useTransform(
    scrollYProgress,
    [0.82, 0.83, 0.96, 0.97],
    [0, 1, 1, 0],
  );
  const mensImgOp = useTransform(
    scrollYProgress,
    [0.82, 0.83, 0.885, 0.895],
    [0, 1, 1, 0],
  );
  const womensImgOp = useTransform(
    scrollYProgress,
    [0.895, 0.905, 0.96, 0.97],
    [0, 1, 1, 0],
  );

  // Scene 6: RSVP
  const rOp = useTransform(scrollYProgress, [0.97, 0.98, 1, 1], [0, 1, 1, 1]);
  const rY = useTransform(scrollYProgress, [0.97, 0.98], ["40px", "0px"]);
  const rDisplay = useTransform(scrollYProgress, (v) =>
    v > 0.965 ? "flex" : "none",
  );

  const events = [
    {
      date: "November 1",
      time: "12:00 PM",
      name: "Lunch",
      icon: <Utensils size={18} />,
    },
    {
      date: "November 1",
      time: "6:00 PM",
      name: "Hi-tea",
      icon: <GlassWater size={18} />,
    },
    {
      date: "November 1",
      time: "7:00 PM",
      name: "Engagement Ceremony",
      icon: <Heart size={18} />,
    },
    {
      date: "November 1",
      time: "8:00 PM",
      name: "DJ Night + Dinner",
      icon: <Music size={18} />,
    },
    {
      date: "November 2",
      time: "8:00 AM",
      name: "Breakfast",
      icon: <Utensils size={18} />,
    },
    {
      date: "November 2",
      time: "12:00 PM",
      name: "Farewell Lunch",
      icon: <Utensils size={18} />,
    },
  ];

  return (
    <>

      <div
        className={`fixed inset-0 flex flex-col items-center justify-center bg-[#fdfbf7] text-amber-900 z-[100] transition-opacity duration-1000 ${isStarted ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <motion.div
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="mb-6"
        >
          <Heart className="w-10 h-10 text-amber-900 fill-amber-900/20 opacity-80" />
        </motion.div>
        <h2 className="font-editorial text-xl md:text-2xl tracking-widest uppercase opacity-70 mb-8">
          {isReady ? "Magic Awaits" : "Preparing Magic..."}
        </h2>
        {isReady && (
          <button
            onClick={handleStart}
            className="px-8 py-3 bg-amber-950/10 hover:bg-amber-950/20 text-amber-950 font-editorial tracking-[0.2em] uppercase text-sm border border-amber-900/30 rounded-none transition-all duration-500 ease-in-out hover:-translate-y-1"
          >
            Open Invitation
          </button>
        )}
      </div>

      <div
        ref={containerRef}
        style={{ height: "1250vh" }}
        className={`w-full relative bg-slate-900 font-sans transition-opacity duration-1000 ${isStarted ? "opacity-100" : "opacity-0 overflow-hidden"}`}
      >
        {/* Sticky Viewport */}
        <motion.div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-slate-900">
          {/* Layered SVG Background */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Sky */}
            <motion.div
              className="absolute inset-0"
              style={{ background: bgSky }}
            />

            {/* Sun / Moon */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: "100px",
                height: "100px",
                left: "20%",
                top: topSun,
                background: bgSun,
                boxShadow: shadowSun,
              }}
            />

            <BirdFlock progress={scrollYProgress} />
            <GlobalParticles progress={scrollYProgress} />
            <NightFireworks progress={scrollYProgress} />

            {/* Ocean Base */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[45%] md:h-[50%] z-[10]"
              style={{ background: bgOcean }}
            >
              {/* Back Waves */}
              <div className="absolute top-[0%] w-[200%] h-12 flex items-start animate-[wave-scroll_20s_linear_infinite]">
                <svg
                  viewBox="0 0 1200 40"
                  fill="none"
                  className="w-[100%] h-full opacity-20"
                >
                  <path
                    d="M0 20 Q 300 0, 600 20 T 1200 20 L1200 40 L0 40 Z"
                    fill="white"
                  />
                </svg>
                <svg
                  viewBox="0 0 1200 40"
                  fill="none"
                  className="w-[100%] h-full opacity-20 absolute left-[100%]"
                >
                  <path
                    d="M0 20 Q 300 0, 600 20 T 1200 20 L1200 40 L0 40 Z"
                    fill="white"
                  />
                </svg>
              </div>

              {/* Mid Waves */}
              <div className="absolute top-[10%] w-[200%] h-16 flex items-start animate-[wave-scroll_15s_linear_infinite_reverse]">
                <svg
                  viewBox="0 0 1200 50"
                  fill="none"
                  className="w-[100%] h-full opacity-30"
                >
                  <path
                    d="M0 25 Q 300 10, 600 25 T 1200 25 L1200 50 L0 50 Z"
                    fill="white"
                  />
                </svg>
                <svg
                  viewBox="0 0 1200 50"
                  fill="none"
                  className="w-[100%] h-full opacity-30 absolute left-[100%]"
                >
                  <path
                    d="M0 25 Q 300 10, 600 25 T 1200 25 L1200 50 L0 50 Z"
                    fill="white"
                  />
                </svg>
              </div>

              {/* Boat */}
              <motion.div
                className="absolute top-[-40px] md:top-[-60px] animate-[sail_40s_linear_infinite]"
                style={{ filter: boatFilter }}
              >
                <CustomSailboat className="w-40 h-40 md:w-64 md:h-64 drop-shadow-xl" />
              </motion.div>

              {/* Fore waves */}
              <div className="absolute bottom-[20%] w-[200%] h-24 flex items-start animate-[wave-scroll_12s_linear_infinite]">
                <svg
                  viewBox="0 0 1200 80"
                  fill="none"
                  className="w-[100%] h-full opacity-40"
                >
                  <path
                    d="M0 40 Q 300 20, 600 40 T 1200 40 L1200 80 L0 80 Z"
                    fill="#7dd3fc"
                  />
                </svg>
                <svg
                  viewBox="0 0 1200 80"
                  fill="none"
                  className="w-[100%] h-full opacity-40 absolute left-[100%]"
                >
                  <path
                    d="M0 40 Q 300 20, 600 40 T 1200 40 L1200 80 L0 80 Z"
                    fill="#7dd3fc"
                  />
                </svg>
              </div>

              {/* Frontmost waves */}
              <div className="absolute bottom-[0%] w-[200%] h-32 flex items-end animate-[wave-scroll_8s_linear_infinite_reverse]">
                <svg
                  viewBox="0 0 1200 100"
                  fill="none"
                  className="w-[100%] h-full opacity-30"
                >
                  <path
                    d="M0 50 Q 300 30, 600 50 T 1200 50 L1200 100 L0 100 Z"
                    fill="#38bdf8"
                  />
                </svg>
                <svg
                  viewBox="0 0 1200 100"
                  fill="none"
                  className="w-[100%] h-full opacity-30 absolute left-[100%]"
                >
                  <path
                    d="M0 50 Q 300 30, 600 50 T 1200 50 L1200 100 L0 100 Z"
                    fill="#38bdf8"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Sand Base */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[30%] md:h-[25%] z-[11]"
              style={{ background: bgSand }}
            >
              {/* Sand Edge overlap */}
              <svg
                viewBox="0 0 1440 100"
                className="absolute top-[-50px] w-full h-[60px] md:top-[-80px] md:h-[100px] pointer-events-none"
                preserveAspectRatio="none"
              >
                <motion.path
                  style={{ fill: sandColor }}
                  d="M0,80 Q360,70 720,80 T1440,80 L1440,100 L0,100 Z"
                />
              </svg>
            </motion.div>

            {/* Arch Gate Shadow */}
            <motion.img
              src="/assets/arch2.png"
              alt="Arch Shadow"
              className="absolute bottom-[6%] md:bottom-[6%] left-1/2 w-[525px] md:w-[900px] max-w-[130vw] md:max-w-none pointer-events-none z-[12]"
              style={{
                transformOrigin: "50% 95%",
                x: "-50%",
                y: "-6%",
                opacity: archShadowOpacity,
                scaleY: archShadowScaleY,
                scaleX: 1,
                skewX: archShadowSkewX,
                filter: "brightness(0) blur(6px)",
              }}
            />

            {/* Arch Gate */}
            <motion.img
              src="/assets/arch2.png"
              alt="Wedding Arch"
              className="absolute bottom-[6%] md:bottom-[6%] left-1/2 w-[525px] md:w-[900px] max-w-[130vw] md:max-w-none z-[13]"
              style={{
                transformOrigin: "50% 95%",
                x: "-50%",
                filter: archFilter,
              }}
            />

            {/* Couple Shadow */}
            <motion.img
              src="/assets/couple_2.png"
              alt="Couple Shadow"
              className="absolute bottom-[10%] md:bottom-[12%] left-1/2 -translate-x-[25%] w-[250px] md:w-[400px] max-w-[55vw] md:max-w-none pointer-events-none z-[14]"
              style={{
                transformOrigin: "50% 95%",
                y: "-6%",
                opacity: coupleShadowOp,
                scaleY: archShadowScaleY,
                scaleX: 1,
                skewX: archShadowSkewX,
                filter: "brightness(0) blur(4px)",
              }}
            />

            {/* Couple in the night */}
            <motion.img
              src="/assets/couple_2.png"
              alt="Couple"
              className="absolute bottom-[10%] md:bottom-[12%] left-1/2 -translate-x-[25%] w-[250px] md:w-[400px] max-w-[55vw] md:max-w-none z-[15] origin-bottom"
              style={{ opacity: coupleImgOp }}
            />

            {/* Palm Trees (Leaves only) */}
            <div className="absolute top-[-5%] left-[-5%] w-[250px] md:w-[450px] max-w-[50vw] z-30 -scale-x-100">
              <motion.img
                src="/assets/tree.png"
                alt="Coconut Leaves"
                className="w-full h-auto origin-top-right animate-[sway_5s_ease-in-out_infinite]"
                style={{ filter: sceneFilter }}
              />
            </div>
            <div className="absolute top-[-5%] right-[-5%] w-[250px] md:w-[450px] max-w-[50vw] z-30">
              <motion.img
                src="/assets/tree.png"
                alt="Coconut Leaves"
                className="w-full h-auto origin-top-right animate-[sway_6s_ease-in-out_infinite]"
                style={{ filter: sceneFilter }}
              />
            </div>

            {/* Texture Overlay */}
            <div className="absolute inset-0 noise-overlay z-20" />
          </div>

          {/* ----- SCENE 0: ENVELOPE ----- */}
          <motion.div
            style={{
              opacity: envelopeOpacity,
              y: envelopeY,
              display: envelopeDisplay,
            }}
            className="absolute inset-0 flex items-center justify-center perspective-[1200px] z-50"
          >
            <div className="absolute top-[10%] text-center animate-bounce text-amber-800/80 font-sans text-xs md:text-sm flex flex-col items-center gap-2 transform translate-z-[50px]">
              <span className="uppercase tracking-widest font-bold">
                Scroll slowly
              </span>
              <div className="w-px h-10 md:h-16 bg-amber-800/60" />
            </div>

            <motion.div
              style={{ rotateY: envelopeRotateY }}
              className="relative w-72 h-48 md:w-[460px] md:h-[300px] preserve-3d shadow-xl shadow-amber-900/10"
            >
              {/* ENVELOPE BACK (Seen first, rotateY=0) */}
              <div
                className="absolute inset-0 bg-[#fdfbf7] rounded-md backface-hidden flex items-center justify-center border border-stone-200 overflow-hidden shadow-md"
                style={{ transform: "rotateY(0deg) translateZ(-1px)" }}
              >
                {/* Elegant Vintage Frame */}
                <div className="w-[90%] h-[85%] border border-amber-700/30 p-1.5 flex flex-col items-center justify-center relative bg-white/50">
                  <div className="w-full h-full border border-amber-700/30 flex flex-col items-center justify-center relative overflow-hidden">
                    {/* Corner Accents */}
                    <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-amber-700/60" />
                    <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-amber-700/60" />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-amber-700/60" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-amber-700/60" />

                    {/* Mock Postage Stamp */}
                    <div className="absolute top-3 right-3 w-8 h-10 border border-amber-900/10 bg-[#fdfbf6] flex flex-col items-center justify-center p-0.5 rounded-sm shadow-sm rotate-2 mix-blend-multiply">
                      <div className="w-full h-full border border-amber-900/15 rounded-sm opacity-70 flex flex-col items-center justify-between py-0.5 overflow-hidden relative">
                        {/* Postal cancellation lines */}
                        <div className="absolute inset-0 flex flex-col justify-center gap-[2px] rotate-[-25deg] opacity-[0.15] pointer-events-none scale-150 -translate-y-1">
                          <div className="w-full h-[0.5px] bg-slate-900" />
                          <div className="w-full h-[0.5px] bg-slate-900" />
                          <div className="w-full h-[0.5px] bg-slate-900" />
                          <div className="w-full h-[0.5px] bg-slate-900" />
                        </div>
                        <span className="text-[4px] font-editorial uppercase tracking-widest text-amber-800/80">
                          Post
                        </span>
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          stroke="none"
                          className="text-amber-800/70 -rotate-12"
                        >
                          <path d="M18.8 4c-1.4-.4-3 0-4.3 1C13.2 6.1 12 7.7 12 9.5c0 1.8 1.2 3.4 2.5 4.5 1.3 1 2.9 1.4 4.3 1 1.4-.4 2.5-1.5 3-2.9.5-1.4.3-3-.7-4.3-1-1.3-2.6-1.5-4-1C16.8 2.6 15 1.3 13.1.5c-.8-.3-1.6-.5-2.5-.5-2 .1-3.9 1-5.3 2.5C2.6 5.4 1.3 9.4 2.1 13.3c.5 2.5 1.9 4.8 3.9 6.2 2 1.4 4.5 1.9 7 1.3L15 20l-1-2-1.8.6c-2 .5-4-.1-5.6-1.3-1.5-1.1-2.5-2.8-2.9-4.8C3 9 4.1 5.5 6.3 3.4c1.1-1.1 2.5-1.8 4.1-2 .7 0 1.3.1 2 .3.6 1.4 1.9 2.5 3.3 3.1z" />
                        </svg>
                        <span className="text-[4px] font-editorial uppercase tracking-widest text-amber-800/80">
                          0.25
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-center z-10 gap-1 md:gap-2 mt-2">
                      <span className="font-editorial text-amber-900/80 text-[7px] md:text-[9px] tracking-[0.3em] uppercase">
                        Formal Invitation
                      </span>
                      <div className="w-8 h-[1px] bg-amber-900/40" />

                      {/* Minimalist floral crest */}
                      <div className="py-2 md:py-3 z-10 flex items-center justify-center opacity-80 mix-blend-multiply">
                        <svg
                          width="56"
                          height="56"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#92400e"
                          strokeWidth="0.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="rotate-[15deg]"
                        >
                          <path d="M12 22c0-4.5-4-8-9-10 4 0 8 3 9 10" />
                          <path d="M12 22c0-4.5 4-8 9-10-4 0-8 3-9 10" />
                          <path d="M12 22V12" />
                          <path d="M12 12c-2-3-4-5-7-7 3 1 6 4 7 7" />
                          <path d="M12 12c2-3 4-5 7-7-3 1-6 4-7 7" />
                          <path d="M10 8c-1-2-2-3-3.5-4.5 1.5.5 3 2 3.5 4.5" />
                          <path d="M14 8c1-2 2-3 3.5-4.5-1.5.5-3 2-3.5 4.5" />
                          <circle
                            cx="12"
                            cy="7"
                            r="2.5"
                            fill="#fcd34d"
                            stroke="none"
                          />
                        </svg>
                      </div>

                      <div className="w-8 h-[1px] bg-amber-900/40 mb-1.5" />
                      <span className="font-editorial text-amber-900/70 text-[9px] md:text-[11px] tracking-[0.1em] italic text-center px-4 leading-relaxed">
                        An elegant evening <br className="md:hidden" />
                        under the stars
                      </span>
                    </div>
                    <div className="absolute inset-0 noise-overlay opacity-30 mix-blend-overlay pointer-events-none"></div>
                  </div>
                </div>
              </div>
              {/* ENVELOPE FRONT (Seen when rotated, rotateY=180) */}
              <div
                className="absolute inset-0 bg-[#f4f1ea] rounded-md backface-hidden shadow-inner preserve-3d"
                style={{ transform: "rotateY(180deg) translateZ(1px)" }}
              >
                {/* Flap (Rotates up) */}
                <motion.div
                  style={{ rotateX: flapRotateX, z: 2 }}
                  className="absolute top-0 inset-x-0 h-[65%] origin-top preserve-3d z-30"
                >
                  {/* Hinge cover to prevent rendering gap */}
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-[#fdfbf7]" style={{ transform: "translateY(-1px) translateZ(0.2px)" }}></div>
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-[#0f172a]" style={{ transform: "translateY(-1px) rotateX(180deg) translateZ(0.2px)" }}></div>

                  {/* Inner flap (visible when open) - Stars pattern matching the inner envelope */}
                  <div
                    className="absolute inset-0 bg-[#0f172a] backface-hidden clip-triangle-up shadow-[inset_0_-10px_20px_rgba(0,0,0,0.5)] overflow-hidden"
                    style={{ transform: "rotateX(180deg) translateZ(0.5px)" }}
                  >
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-700 via-slate-900 to-black clip-triangle-up"></div>
                    <div className="absolute top-[20%] left-[30%] w-0.5 h-0.5 bg-amber-100 rounded-full"></div>
                    <div className="absolute top-[40%] right-[40%] w-1 h-1 bg-amber-100 rounded-full blur-[0.5px]"></div>
                  </div>

                  {/* Outer flap */}
                  <div
                    className="absolute inset-0 bg-[#fdfbf7] backface-hidden border-b border-amber-900/10 shadow-[0_5px_10px_rgba(0,0,0,0.1)] clip-triangle"
                    style={{ transform: "translateZ(0.5px)" }}
                  >
                    {/* Inner styling of flap */}
                    <div className="absolute inset-0 noise-overlay opacity-30 mix-blend-overlay clip-triangle"></div>
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      preserveAspectRatio="none"
                      viewBox="0 0 100 100"
                    >
                      <polygon
                        points="0,0 50,100 100,0"
                        fill="none"
                        stroke="rgba(120, 53, 15, 0.05)"
                        strokeWidth="0.5"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>

                  {/* Decorative Rose Accent (Tucked under the seal) */}
                  <div 
                    className="absolute bottom-0 left-1/2 w-24 h-32 md:w-32 md:h-44 z-30 pointer-events-none drop-shadow-md preserve-3d"
                    style={{ transform: "translate3d(-60%, 30%, 0.8px) rotate(-20deg)" }}
                  >
                    <img 
                      src="/assets/rose.PNG" 
                      alt="Rose Boutonniere" 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = 'block';
                      }}
                    />
                    {/* Fallback elegant floral SVG */}
                    <svg className="w-full h-full text-amber-900/40 hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.1))" }}>
                      <path d="M12 22c0-4.5-4-8-9-10 4 0 8 3 9 10" />
                      <path d="M12 22c0-4.5 4-8 9-10-4 0-8 3-9 10" />
                      <path d="M12 22V12" />
                      <path d="M12 12c-2-3-4-5-7-7 3 1 6 4 7 7" />
                      <path d="M12 12c2-3 4-5 7-7-3 1-6 4-7 7" />
                      <path d="M10 8c-1-2-2-3-3.5-4.5 1.5.5 3 2 3.5 4.5" />
                      <path d="M14 8c1-2 2-3 3.5-4.5-1.5.5-3 2-3.5 4.5" />
                      <circle cx="12" cy="7" r="2.5" fill="#fcd34d" stroke="none" />
                    </svg>
                  </div>

                  {/* Wax Seal Container */}
                  <div
                    className="absolute bottom-0 left-1/2 w-12 h-12 md:w-16 md:h-16 preserve-3d z-40 pointer-events-none"
                    style={{ transform: "translateX(-50%) translateY(50%)" }}
                  >
                    {/* Front of Seal */}
                    <div
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-[#710000] via-[#5c0000] to-[#3a0000] shadow-[0_4px_10px_rgba(0,0,0,0.4),inset_0_2px_4px_rgba(255,255,255,0.2)] flex items-center justify-center backface-hidden"
                      style={{ transform: "translateZ(1px)" }}
                    >
                      <div className="absolute inset-1 rounded-full border border-[#9c1c1c]/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] flex items-center justify-center">
                        <span className="font-editorial text-amber-100/90 text-[11px] md:text-sm tracking-widest font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,1)] pr-[1px] md:pr-[2px]">
                          P&amp;S
                        </span>
                      </div>
                      <div className="absolute top-[15%] right-[20%] w-3 h-3 bg-white/10 rounded-full blur-[2px]" />
                    </div>
                    {/* Back of Seal (Seen when flap opens) */}
                    <div
                      className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#2a0000] to-[#4a0000] shadow-inner flex items-center justify-center backface-hidden border border-black/40"
                      style={{ transform: "rotateX(180deg) translateZ(1px)" }}
                    >
                      <div className="w-[80%] h-[80%] rounded-full bg-[#3a0000] shadow-inner filter blur-[1px]"></div>
                    </div>
                  </div>
                </motion.div>
                {/* Body of Front */}
                <div className="absolute inset-0 bg-[#fdfbf7] overflow-hidden rounded-md shadow-[inset_0_-10px_20px_rgba(0,0,0,0.02)]">
                  {/* Inner dark pocket - Now starry night to match themes! */}
                  <div className="absolute top-0 inset-x-0 h-2/3 bg-[#0f172a] shadow-[inset_0_-20px_30px_rgba(0,0,0,0.5)] z-10 overflow-hidden">
                    <div className="absolute inset-0 opacity-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-700 via-slate-900 to-black"></div>
                    <div className="absolute top-[20%] left-[20%] w-1 h-1 bg-amber-100 rounded-full blur-[0.5px]"></div>
                    <div className="absolute top-[40%] right-[30%] w-0.5 h-0.5 bg-amber-100 rounded-full"></div>
                    <div className="absolute top-[30%] left-[60%] w-1.5 h-1.5 bg-amber-200/80 rounded-full blur-[1px]"></div>
                  </div>

                  {/* Envelope body flaps using clip-path to expose only the exact top pocket triangle */}
                  <div
                    className="absolute inset-0 z-20 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.02)]"
                    style={{ transform: "translateZ(1px)" }}
                  >
                    <div
                      className="absolute inset-0 bg-[#faf6f0]"
                      style={{
                        clipPath:
                          "polygon(0 0, 50% 50%, 100% 0, 100% 100%, 0 100%)",
                      }}
                    />
                    {/* Creases to separate the side panels and bottom panel */}
                    <div className="absolute inset-0 z-20 pointer-events-none">
                      <div className="absolute inset-0 border-t border-amber-900/5 rotate-45 scale-150 origin-bottom-left blur-[0.5px] translate-y-1/3"></div>
                      <div className="absolute inset-0 border-t border-amber-900/5 -rotate-45 scale-150 origin-bottom-right blur-[0.5px] translate-y-1/3"></div>
                    </div>
                  </div>

                  <div className="absolute inset-0 noise-overlay opacity-30 mix-blend-overlay z-30 pointer-events-none"></div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ----- SCENE 1: NAMES ----- */}
          <motion.div
            style={{ opacity: nOp }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-slate-900 z-40 pointer-events-none drop-shadow-xl"
          >
            <div className="bg-[#fdfbf8]/95 backdrop-blur-sm border border-amber-900/15 rounded-2xl shadow-[0_15px_40px_rgba(139,92,26,0.1)] relative overflow-hidden p-8 md:p-14 md:px-16 flex flex-col items-center">
              <div className="absolute inset-2 border border-amber-800/15 rounded-xl pointer-events-none" />
              <h3 className="font-editorial tracking-[0.25em] uppercase text-[10px] md:text-sm mb-4 md:mb-6 font-semibold text-amber-900/80 drop-shadow-sm z-10">
                Together with their families
              </h3>
              <h1 className="font-cursive text-[45px] leading-tight md:text-[90px] font-normal tracking-normal text-slate-950 pb-2 z-10">
                Pritha
                <span className="font-cursive font-normal text-[50px] md:text-[100px] px-3 md:px-6 text-amber-600 align-middle">
                  &amp;
                </span>
                <br className="md:hidden" />
                Souparna
              </h1>
            </div>
          </motion.div>

          {/* ----- SCENE 2: ENGAGEMENT ----- */}
          <motion.div
            style={{ opacity: eOp }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-slate-900 z-40 pointer-events-none drop-shadow-xl"
          >
            <div className="bg-[#fdfbf8]/95 backdrop-blur-sm border border-amber-900/15 rounded-2xl shadow-[0_15px_40px_rgba(139,92,26,0.1)] relative overflow-hidden p-8 md:p-14 md:px-16 flex flex-col items-center max-w-lg">
              <div className="absolute inset-2 border border-amber-800/15 rounded-xl pointer-events-none" />
              <h3 className="font-editorial tracking-[0.2em] text-[10px] md:text-xs mb-4 md:mb-6 max-w-xs uppercase leading-relaxed font-semibold text-slate-500 z-10">
                Request the pleasure of your company at the ceremony of their
              </h3>
              <h1 className="font-cursive font-normal text-[60px] md:text-[90px] text-amber-700/95 pb-2 z-10">
                Engagement
              </h1>
            </div>
          </motion.div>

          {/* ----- SCENE 3: VENUE ----- */}
          <motion.div
            style={{ opacity: vOp }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 text-slate-900 z-40 pointer-events-none drop-shadow-xl w-full"
          >
            <motion.div
              style={{
                pointerEvents: useTransform(vOp, (v) =>
                  v > 0.05 ? "auto" : "none",
                ) as any,
              }}
              className="bg-[#fdfbf8]/95 backdrop-blur-sm border border-amber-900/15 rounded-2xl shadow-[0_15px_40px_rgba(139,92,26,0.1)] relative overflow-hidden p-8 md:px-14 flex flex-col items-center max-w-[90vw] md:max-w-2xl w-full"
            >
              <div className="absolute inset-2 border border-amber-800/15 rounded-xl pointer-events-none" />
              <motion.h3
                style={{}}
                className="font-serif italic text-xl md:text-2xl text-amber-700/95 mb-2 mt-1 z-10"
              >
                at the
              </motion.h3>
              <h1 className="font-cursive text-4xl md:text-6xl font-normal tracking-normal text-slate-950 mb-3 drop-shadow-sm z-10">
                Bombay Beach Resort
              </h1>
              <motion.div
                style={{}}
                className="flex items-center gap-1.5 text-slate-600 border-t border-slate-900/10 pt-4 mt-2 z-10"
              >
                <MapPin size={18} className="text-amber-700/80" />
                <h2 className="text-[11px] md:text-sm tracking-[0.3em] uppercase font-semibold text-slate-700 w-full text-center">
                  Mandarmani
                </h2>
              </motion.div>

              {/* Embed Map Snippet */}
              <a
                href="https://maps.app.goo.gl/e8HxBLMhzH3o486K8"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full mt-6 h-32 md:h-48 rounded-lg overflow-hidden border border-amber-900/20 shadow-inner z-10 relative group cursor-pointer bg-[#fdfbf6]"
              >
                <div className="absolute inset-0 z-20 bg-amber-900/5 group-hover:bg-transparent transition-colors duration-500" />{" "}
                {/* Overlay to capture clicks */}
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000.0!2d87.708227!3d21.6652341!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a03255a182e0a3f%3A0xe23d5112894ed644!2sBombay%20Beach%20Resort!5e0!3m2!1sen!2sus!4v1718023530000!5m2!1sen!2sus"
                  className="absolute inset-0 w-full h-full grayscale opacity-80 mix-blend-multiply transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:mix-blend-normal pointer-events-none"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Venue Map"
                />
              </a>
            </motion.div>
          </motion.div>

          {/* ----- SCENE 4 TEXT CARD (Rendered above particles) ----- */}
          <motion.div
            style={{ opacity: gateTextOp, y: gateTextY, scale: gateTextScale }}
            className="absolute inset-x-0 top-0 text-center px-4 z-[45] w-full pointer-events-none flex justify-center h-fit"
          >
            <div className="bg-[#fdfbf8]/95 border border-amber-900/15 px-4 py-2.5 md:px-8 md:py-4 rounded-none shadow-md flex items-center justify-center gap-2 md:gap-4 origin-center max-w-[90vw]">
              <Calendar className="text-amber-800/85 w-4 h-4 md:w-5 md:h-5 shrink-0" />
              <h3 className="font-editorial tracking-[0.1em] md:tracking-[0.2em] uppercase text-amber-950 text-[13px] md:text-xl font-bold flex items-center m-0 mt-0.5 whitespace-nowrap">
                November 1 &amp; 2, 2026
              </h3>
            </div>
          </motion.div>

          {/* ----- SCENE 4: CARDS ----- */}
          <motion.div
            style={{ opacity: gateOpacity }}
            className="absolute inset-0 flex flex-col items-center justify-center z-20 overflow-hidden pointer-events-none"
          >
            {/* Cards floating on the realistic sunset */}
            <motion.div
              style={{
                scale: gateScale,
                pointerEvents: useTransform(gateOpacity, (v) =>
                  v > 0.05 ? "auto" : "none",
                ) as any,
              }}
              className="absolute top-[20%] md:top-[22%] w-[90%] max-w-4xl mx-auto z-30 perspective-1000 flex flex-col items-center gap-6 md:gap-8 origin-center"
            >
              {/* Day 1 */}
              <div className="w-full">
                <motion.div
                  style={{
                    opacity: useTransform(
                      scrollYProgress,
                      [0.48, 0.5, 0.62, 0.65],
                      [0, 1, 1, 0],
                    ),
                  }}
                  className="flex justify-center mb-4"
                >
                  <span className="font-editorial tracking-[0.25em] uppercase text-xs md:text-sm font-semibold px-8 py-2 bg-[#fdfbf8]/95 border border-amber-900/15 rounded-none text-amber-950 shadow-sm">
                    Day 1
                  </span>
                </motion.div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {events.slice(0, 4).map((card, idx) => (
                    <AnimatedCard
                      key={idx}
                      progress={scrollYProgress}
                      card={card}
                      index={idx}
                    />
                  ))}
                </div>
              </div>

              {/* Day 2 */}
              <div className="w-full max-w-sm md:max-w-md">
                <motion.div
                  style={{
                    opacity: useTransform(
                      scrollYProgress,
                      [0.54, 0.56, 0.62, 0.65],
                      [0, 1, 1, 0],
                    ),
                  }}
                  className="flex justify-center mb-4"
                >
                  <span className="font-editorial tracking-[0.25em] uppercase text-xs md:text-sm font-semibold px-8 py-2 bg-[#fdfbf8]/95 border border-amber-900/15 rounded-none text-amber-950 shadow-sm">
                    Day 2
                  </span>
                </motion.div>
                <div className="grid grid-cols-2 gap-3 md:gap-4 w-full">
                  {events.slice(4).map((card, idx) => (
                    <AnimatedCard
                      key={idx + 4}
                      progress={scrollYProgress}
                      card={card}
                      index={idx + 4}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ----- SCENE 4.5: NIGHT CELEBRATION ----- */}
          <motion.div
            style={{ opacity: coupleTextOp }}
            className="absolute inset-0 flex flex-col items-center justify-start pt-[10vh] md:pt-[12vh] text-center p-6 text-amber-100 z-50 pointer-events-none drop-shadow-[0_4px_15px_rgba(0,0,0,0.6)]"
          >
            <div className="bg-[#0b0f19]/80 backdrop-blur-sm border border-amber-500/20 rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.9)] relative overflow-hidden p-6 md:p-10 md:px-12 flex flex-col items-center max-w-xl mx-auto">
              <div className="absolute inset-2 border border-amber-500/10 rounded-xl pointer-events-none" />
              <img
                src="/assets/rings.png"
                alt="Wedding Rings"
                className="w-16 h-16 md:w-20 md:h-20 mb-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] object-contain z-10"
              />
              <h3 className="tracking-[0.25em] font-editorial italic text-base md:text-xl mb-1.5 opacity-90 text-amber-100/90 font-light z-10">
                Where the sun sets...
              </h3>
              <h1 className="font-serif font-light text-3xl md:text-5xl tracking-[0.05em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-[#fde047] py-2 z-10">
                A Promise Is Made
              </h1>
            </div>
          </motion.div>

          {/* ----- SCENE 4.75: BE OUR GUEST ----- */}
          <motion.div
            style={{ opacity: guestOp }}
            className="absolute inset-0 flex flex-col items-center justify-start pt-[10vh] md:pt-[12vh] text-center p-6 text-slate-100 z-50 pointer-events-none"
          >
            <div className="bg-[#0b0f19]/90 rounded-2xl p-8 md:p-12 border border-amber-950/80 shadow-[0_15px_50px_rgba(0,0,0,0.9)] flex flex-col items-center w-[90%] max-w-lg mx-auto relative overflow-hidden backdrop-blur-sm">
              <div className="absolute inset-2 border border-amber-500/10 rounded-xl pointer-events-none" />

              <div className="text-3xl mb-4">🥂</div>

              <h2 className="font-serif text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 mb-5 font-light tracking-wide z-10 uppercase">
                Be our guest
              </h2>
              <p className="font-serif italic text-sm md:text-base text-amber-100/80 mb-2 whitespace-pre-line leading-relaxed z-10 font-normal">
                We request the honour of your presence {"\n"}as we celebrate
                this special chapter {"\n"}of our lives.
              </p>
            </div>
          </motion.div>

          {/* ----- SCENE 5: DRESS CODE ----- */}
          {/* Note that during this scene, bgColor changes to #0f172a (dark blue night) */}
          <motion.div
            style={{ opacity: dOp }}
            className="absolute inset-0 flex flex-col items-center justify-start pt-[10vh] md:pt-[12vh] text-center p-6 text-slate-100 z-50 pointer-events-none"
          >
            <motion.div
              style={{}}
              className="absolute top-[30%] left-[15%] text-amber-100/30"
            >
              <Sparkles size={40} strokeWidth={1} />
            </motion.div>
            <motion.div
              style={{}}
              className="absolute top-[20%] right-[20%] text-amber-100/30"
            >
              <Sparkles size={24} strokeWidth={1} />
            </motion.div>

            <div className="bg-[#0b0f19]/90 rounded-2xl pt-8 pb-4 px-8 md:pt-12 md:pb-6 md:px-12 border border-amber-950/80 shadow-[0_15px_50px_rgba(0,0,0,0.9)] flex flex-col items-center justify-between w-[90%] max-w-lg mx-auto relative overflow-hidden backdrop-blur-sm min-h-[380px] md:min-h-[460px]">
              <div className="absolute inset-2 border border-amber-500/10 rounded-xl pointer-events-none" />

              <div className="flex flex-col items-center w-full z-10 pt-0">
                <div className="mb-3 md:mb-5 p-2 md:p-3 rounded-none border border-amber-500/25 bg-slate-900/60 shadow-lg transform rotate-45 mx-auto">
                  <Heart
                    className="w-4 md:w-5 h-4 md:h-5 text-amber-400/90 -rotate-45 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]"
                    strokeWidth={1.2}
                  />
                </div>
                <h3 className="font-editorial tracking-[0.25em] text-[10px] md:text-sm uppercase text-amber-300/95 font-semibold">
                  Dress code
                </h3>
              </div>

              <div className="relative w-full flex-1 flex items-center justify-center mb-2 mt-0 md:mb-4 md:-mt-2 overflow-hidden">
                <motion.div
                  style={{ opacity: mensImgOp }}
                  className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 px-2 py-2 mt-0 md:-mt-2"
                >
                  <img
                    src="/assets/MensOutfits.png"
                    alt="Mens Outfit"
                    className="h-[85%] w-auto md:h-[95%] md:w-auto md:max-w-[26rem] object-contain drop-shadow-xl z-10 scale-100 md:scale-105 origin-center"
                  />
                </motion.div>

                <motion.div
                  style={{ opacity: womensImgOp }}
                  className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 px-2 py-2 mt-0 md:-mt-2"
                >
                  <img
                    src="/assets/WomensOutfits.png"
                    alt="Womens Outfit"
                    className="h-[85%] w-auto md:h-[95%] md:w-auto md:max-w-[26rem] object-contain drop-shadow-xl z-20 mix-blend-normal relative scale-100 md:scale-105 origin-center translate-x-0.75 md:translate-x-1.5"
                  />
                </motion.div>
              </div>

              <div className="w-full mt-auto flex gap-3 md:gap-4 text-slate-400/80 items-center justify-center z-10">
                <span className="h-px flex-1 bg-slate-500" />
                <span className="text-[9px] md:text-xs tracking-[0.25em] uppercase font-semibold text-amber-100/70 whitespace-nowrap">
                  Elegance under the stars
                </span>
                <span className="h-px flex-1 bg-slate-500" />
              </div>
            </div>
          </motion.div>

          <motion.div
            style={{
              opacity: rOp,
              y: rY,
              pointerEvents: useTransform(rOp, (v) =>
                v > 0.05 ? "auto" : "none",
              ) as any,
            }}
            className="absolute inset-0 flex flex-col items-center justify-center p-4 z-[60] bg-slate-950/80 backdrop-blur-sm"
          >
            <div className="w-full max-w-md bg-[#fdfdfa] rounded-xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center text-center border border-amber-900/20 relative overflow-hidden">
              {/* Decorative border inside card */}
              <div className="absolute inset-2 border border-amber-800/10 rounded-lg pointer-events-none" />
              <div className="absolute inset-1 border border-amber-600/5 rounded-lg pointer-events-none" />

              <h2 className="font-serif italic text-xl md:text-2xl text-amber-900/90 mb-6 font-medium z-10 pt-4">
                We can't wait to celebrate with you
              </h2>

              <Countdown targetDate="2026-11-01T12:00:00+05:30" />

              <div className="font-editorial text-xl md:text-2xl text-amber-950 mt-8 mb-6 uppercase tracking-[0.15em] z-10 w-full font-bold">
                Save the Date
              </div>

              <a
                href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pritha+%26+Souparna+Engagement&dates=20261101T063000Z/20261102T093000Z&details=Join+us+in+celebrating+our+engagement!&location=Bombay+Beach+Resort%2C+Mandarmani"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full group z-10 mb-4"
              >
                <button className="w-full bg-amber-950 hover:bg-amber-900 text-amber-50 font-editorial tracking-[0.1em] uppercase text-[10px] md:text-xs py-3.5 rounded-none transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer">
                  <Calendar
                    size={16}
                    className="group-hover:translate-y-[-2px] transition-transform duration-300"
                  />
                  <div>Add to Calendar</div>
                </button>
              </a>

              <div className="font-editorial tracking-[0.25em] uppercase text-[10px] md:text-xs font-semibold text-amber-900/70 my-3 z-10">
                Mandarmani, West Bengal
              </div>

              <a
                href="https://maps.app.goo.gl/e8HxBLMhzH3o486K8"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full group z-10 mt-3"
              >
                <button className="w-full bg-amber-950 hover:bg-amber-900 text-amber-50 font-editorial tracking-[0.1em] uppercase text-[10px] md:text-xs py-3.5 rounded-none transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer">
                  <MapPin
                    size={16}
                    className="group-hover:translate-y-[-2px] transition-transform duration-300"
                  />
                  <div>Location</div>
                </button>
              </a>

              <div className="w-full group z-10 mt-3">
                <button 
                  onClick={handleDownloadPdf}
                  disabled={isGeneratingPdf}
                  className="w-full bg-[#fdfbf8] hover:bg-amber-50 text-amber-950 border border-amber-900/20 font-editorial tracking-[0.1em] uppercase text-[10px] md:text-xs py-3.5 rounded-none transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-wait"
                >
                  <Download
                    size={16}
                    className="group-hover:translate-y-[-2px] transition-transform duration-300"
                  />
                  <div>{isGeneratingPdf ? "Generating..." : "Download PDF"}</div>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
        <button
          onClick={toggleMusic}
          className="fixed bottom-4 md:bottom-8 right-4 md:right-8 z-[200] p-3 md:p-4 bg-black/40 backdrop-blur-sm rounded-full border border-white/20 text-white shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:bg-white/20 transition-all ease-in-out duration-300 cursor-pointer"
          aria-label="Toggle music"
        >
          {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        </button>
        <audio ref={audioRef} src="/assets/ordinary.mp3" loop />
      </div>
    </>
  );
}
