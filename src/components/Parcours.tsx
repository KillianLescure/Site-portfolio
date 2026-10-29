"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

export default function Parcours() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax transforms for the images (Vertical Scroll)
  const yFast = useTransform(scrollYProgress, [0, 1], [300, -500]);
  const ySlow = useTransform(scrollYProgress, [0, 1], [150, -250]);
  const yReverse = useTransform(scrollYProgress, [0, 1], [-150, 350]);

  // Horizontal drifting for the Typography (Scroll)
  const xLeft1 = useTransform(scrollYProgress, [0, 0.4], ["-15vw", "5vw"]);
  const xRight1 = useTransform(scrollYProgress, [0, 0.4], ["15vw", "-5vw"]);

  const xLeft2 = useTransform(scrollYProgress, [0.2, 0.6], ["-15vw", "5vw"]);
  const xRight2 = useTransform(scrollYProgress, [0.2, 0.6], ["15vw", "-5vw"]);

  const xLeft3 = useTransform(scrollYProgress, [0.4, 0.8], ["-15vw", "5vw"]);
  const xRight3 = useTransform(scrollYProgress, [0.4, 0.8], ["15vw", "-5vw"]);

  const xLeft4 = useTransform(scrollYProgress, [0.6, 1], ["-15vw", "5vw"]);

  // Mouse Tracking for Interactive Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Lusion-inspired scroll-traced line with spring inertia
  const lineProgress = useTransform(scrollYProgress, [0.05, 0.92], [0, 1]);
  const smoothLineProgress = useSpring(lineProgress, {
    stiffness: 50,
    damping: 22,
    restDelta: 0.001
  });

  // Different depths for mouse movement
  const mouseMoveFastX = useTransform(smoothMouseX, [-0.5, 0.5], [-40, 40]);
  const mouseMoveFastY = useTransform(smoothMouseY, [-0.5, 0.5], [-40, 40]);
  
  const mouseMoveSlowX = useTransform(smoothMouseX, [-0.5, 0.5], [-15, 15]);
  const mouseMoveSlowY = useTransform(smoothMouseY, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth) - 0.5;
    const y = (e.clientY / innerHeight) - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section onMouseMove={handleMouseMove} ref={containerRef} id="about" className="relative pt-48 pb-0 lg:pt-80 bg-dark text-white overflow-hidden">
      
      {/* Dynamic Scroll Fade from Light to Dark */}
      <motion.div 
        style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
        className="absolute top-0 left-0 w-full h-[500px] lg:h-[1000px] bg-gradient-to-b from-[#DCE6FF] via-dark to-dark pointer-events-none z-0"
      />

      {/* Lusion-inspired Neon Blue Scroll Ribbon (Timeline spine) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <svg
          viewBox="0 0 1000 3600"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="parcoursLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#376EFE" stopOpacity="0.2" />
              <stop offset="20%" stopColor="#376EFE" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#8BA7FF" stopOpacity="1" />
              <stop offset="80%" stopColor="#376EFE" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#6894FE" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Lueur néon d'ambiance très diffuse */}
          <motion.path
            d="M 180,80 C 450,220 880,420 850,820 C 820,1180 120,1320 150,1720 C 180,2120 880,2260 840,2660 C 800,3000 240,3200 480,3580"
            stroke="#376EFE"
            strokeWidth="20"
            strokeOpacity="0.2"
            strokeLinecap="round"
            fill="none"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: smoothLineProgress }}
            className="blur-xl"
          />

          {/* Lueur médiane vive */}
          <motion.path
            d="M 180,80 C 450,220 880,420 850,820 C 820,1180 120,1320 150,1720 C 180,2120 880,2260 840,2660 C 800,3000 240,3200 480,3580"
            stroke="#376EFE"
            strokeWidth="7"
            strokeOpacity="0.5"
            strokeLinecap="round"
            fill="none"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: smoothLineProgress }}
            className="blur-xs"
          />

          {/* Ligne principale nette et colorée */}
          <motion.path
            d="M 180,80 C 450,220 880,420 850,820 C 820,1180 120,1320 150,1720 C 180,2120 880,2260 840,2660 C 800,3000 240,3200 480,3580"
            stroke="url(#parcoursLineGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: smoothLineProgress }}
          />

          {/* Filament blanc cœur laser */}
          <motion.path
            d="M 180,80 C 450,220 880,420 850,820 C 820,1180 120,1320 150,1720 C 180,2120 880,2260 840,2660 C 800,3000 240,3200 480,3580"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeOpacity="0.65"
            strokeLinecap="round"
            fill="none"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: smoothLineProgress }}
          />
        </svg>
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-48 lg:mb-72">
          <h2 className="text-4xl lg:text-5xl font-light tracking-tight">
            Mon <span className="text-primary font-bold">Parcours</span>
          </h2>
          <p className="max-w-xl text-sm lg:text-base text-white/70 leading-relaxed font-medium">
            Lorem ipsum dolor sit amet consectetur. Duis morbi ut at commodo sem integer id tempor elit. Duis fringilla diam aliquet sit convallis facilisi. Hendrerit congue odio mollis bibendum nulla.
          </p>
        </div>

        {/* Timeline Content */}
        <div className="relative flex flex-col">
          
          {/* Phase 1 */}
          <div className="relative flex flex-col">
            <motion.h3 style={{ x: xLeft1 }} className="text-[18vw] lg:text-[15vw] font-bold leading-[0.8] tracking-tighter">
              Les
            </motion.h3>
            <motion.h3 style={{ x: xRight1 }} className="text-[18vw] lg:text-[15vw] font-bold leading-[0.8] tracking-tighter text-right">
              fondations
            </motion.h3>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-4 lg:mt-8 px-4 lg:px-12 gap-8 z-10 relative">
              <span className="text-4xl md:text-5xl lg:text-6xl text-primary font-black tracking-tighter">2020 - 2023</span>
              <p className="max-w-md text-white/70 text-sm lg:text-base leading-relaxed text-right md:text-left">
                Avant de se lancer de plein fouet, j'ai appris à comprendre les besoins de ce qu'on attend. Mes premières années d'études en commerce et management m'ont vite fait déchanter. Les plus belles idées ont besoin d'être au service d'un plan d'action stratégique.
              </p>
            </div>
          </div>

          {/* Huge Spacer to separate phases visually */}
          <div className="h-[300px] lg:h-[400px]" />

          {/* Phase 2: Le déclic créatif */}
          <div className="relative flex flex-col">
            <motion.h3 style={{ x: xLeft2 }} className="text-[18vw] lg:text-[15vw] font-bold leading-[0.8] tracking-tighter">
              Le déclic
            </motion.h3>
            <motion.h3 style={{ x: xRight2 }} className="text-[18vw] lg:text-[15vw] font-bold leading-[0.8] tracking-tighter text-right z-10">
              créatif
            </motion.h3>
            
            <div className="px-4 lg:px-12 max-w-md z-10 -mt-4 lg:-mt-16 relative">
              <p className="text-white/70 text-sm lg:text-base leading-relaxed">
                Mettre en œuvre, maîtriser, concevoir formellement le site web de mes rêves. C'est à ce moment-là que ma vie a pris un tournant. J'ai compris l'enjeu, je m'en suis imprégné pour en faire des expériences design inoubliables.
              </p>
            </div>

            {/* Image Spacer for Declic */}
            <div className="relative w-full h-[250px] lg:h-[300px] mt-24 mb-12 pointer-events-none">
              <motion.div style={{ y: yFast }} className="absolute -top-[50px] lg:-top-[150px] left-[15%] lg:left-[25%] w-[150px] sm:w-[200px] lg:w-[280px] -rotate-6 z-20">
                <motion.div style={{ x: mouseMoveFastX, y: mouseMoveFastY }} className="w-full h-full">
                  <Image src="/images/RAS.webp" alt="RAS" width={600} height={800} className="w-full h-auto" />
                </motion.div>
              </motion.div>
              <motion.div style={{ y: ySlow }} className="absolute top-[10%] lg:top-[-20px] left-[30%] lg:left-[42%] w-[160px] sm:w-[220px] lg:w-[300px] rotate-3 z-10">
                <motion.div style={{ x: mouseMoveSlowX, y: mouseMoveSlowY }} className="w-full h-full">
                  <Image src="/images/InMyMind.webp" alt="In My Mind" width={600} height={600} className="w-full h-auto" />
                </motion.div>
              </motion.div>
              <motion.div style={{ y: yFast }} className="absolute -top-[100px] lg:-top-[250px] right-[5%] lg:right-[10%] w-[200px] sm:w-[280px] lg:w-[450px] rotate-12 opacity-90 z-0">
                <motion.div style={{ x: mouseMoveFastX, y: mouseMoveFastY }} className="w-full h-full">
                  <Image src="/images/leclub.webp" alt="Le Club" width={800} height={600} className="w-full h-auto" />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Phase 3: Le nouveau départ */}
          <div className="relative flex flex-col">
            <motion.h3 style={{ x: xLeft3 }} className="text-[18vw] lg:text-[15vw] font-bold leading-[0.8] tracking-tighter">
              Le nouveau
            </motion.h3>
            <motion.h3 style={{ x: xRight3 }} className="text-[18vw] lg:text-[15vw] font-bold leading-[0.8] tracking-tighter text-right z-10">
              départ
            </motion.h3>
            
            <div className="flex flex-col-reverse md:flex-row justify-between items-start md:items-center px-4 lg:px-12 gap-8 z-20 relative mt-4 lg:mt-8">
              <p className="max-w-md text-white/70 text-sm lg:text-base leading-relaxed">
                J'ai pu m'immerger dans un Bachelor UI/UX à l'ESD. Le sens de l'esthétique m'a redonné le goût de l'art. Un projet n'a de sens que si l'on a pu y apporter de l'âme.
              </p>
              <span className="text-4xl md:text-5xl lg:text-6xl text-primary font-black tracking-tighter">2023 - 2025</span>
            </div>

            {/* Image Spacer for Nouveau Départ */}
            <div className="relative w-full h-[400px] lg:h-[500px] mt-16 lg:mt-24 mb-12 pointer-events-none">
              <motion.div style={{ y: ySlow }} className="absolute top-[10%] left-[2%] lg:left-[5%] w-[180px] sm:w-[250px] lg:w-[350px] -rotate-12 z-30">
                <motion.div style={{ x: mouseMoveSlowX, y: mouseMoveSlowY }} className="w-full h-full">
                  <Image src="/images/lesyeuxdemonna.webp" alt="Les yeux de monna" width={600} height={800} className="w-full h-auto" />
                </motion.div>
              </motion.div>
              <motion.div style={{ y: yFast }} className="absolute top-[30%] right-[2%] lg:right-[5%] w-[250px] sm:w-[350px] lg:w-[480px] rotate-6 z-30">
                <motion.div style={{ x: mouseMoveFastX, y: mouseMoveFastY }} className="w-full h-full">
                  <Image src="/images/selfiebox-site.webp" alt="Selfiebox" width={800} height={600} className="w-full h-auto" />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Phase 4: L'aboutissement */}
          <div className="relative flex flex-col">
            <motion.h3 style={{ x: xLeft4 }} className="text-[13vw] lg:text-[11vw] font-bold leading-[0.8] tracking-tighter z-20 text-center lg:text-left">
              L'aboutissement
            </motion.h3>
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-4 lg:mt-8 px-4 lg:px-12 gap-8 relative z-20">
              <span className="text-4xl md:text-5xl lg:text-6xl text-primary font-black tracking-tighter">2025 - Maintenant</span>
              <p className="max-w-md text-white/70 text-sm lg:text-base leading-relaxed">
                Aujourd'hui en Master UI/UX à l'ESD, je consolide mon expertise. Mon profil m'indique de trouver des solutions pour contrecarrer les arguments d'une page statique sans émotion. Mes outils sont les esthétiques, interactifs et mémorables.
              </p>
            </div>

            {/* Huge Cluster of UI Shots for Aboutissement */}
            <div className="relative w-full max-w-[1400px] mx-auto h-[500px] lg:h-[700px] mt-48 lg:mt-[300px] pointer-events-none">
              
              {/* Purple Dash (Back right) z-0 */}
              <motion.div style={{ y: ySlow }} className="absolute top-[40%] lg:top-[35%] right-[0%] lg:right-[5%] w-[350px] sm:w-[450px] lg:w-[650px] rotate-6 z-0">
                <motion.div style={{ x: mouseMoveSlowX, y: mouseMoveSlowY }} className="w-full h-full">
                  <Image src="/images/dashboard-playground.webp" alt="Playground" width={1200} height={800} className="w-full h-auto" />
                </motion.div>
              </motion.div>

              {/* White Dash (Center) z-10 */}
              <motion.div style={{ y: ySlow }} className="absolute top-[10%] lg:top-[5%] left-[10%] lg:left-[22%] w-[400px] sm:w-[500px] lg:w-[800px] -rotate-3 z-10">
                <motion.div style={{ x: mouseMoveFastX, y: mouseMoveFastY }} className="w-full h-full">
                  <Image src="/images/dashboard-home.webp" alt="Dashboard" width={1200} height={800} className="w-full h-auto" />
                </motion.div>
              </motion.div>

              {/* White Phone (Top Left) z-20 */}
              <motion.div style={{ y: yFast }} className="absolute top-[5%] lg:top-[0%] left-[0%] lg:left-[12%] w-[140px] sm:w-[180px] lg:w-[260px] -rotate-12 z-20">
                <motion.div style={{ x: mouseMoveSlowX, y: mouseMoveSlowY }} className="w-full h-full">
                  <Image src="/images/home-app.webp" alt="Home App" width={400} height={800} className="w-full h-auto" />
                </motion.div>
              </motion.div>
              
              {/* Dark Phone (Top Right) z-20 */}
              <motion.div style={{ y: yFast }} className="absolute top-[20%] lg:top-[15%] right-[5%] lg:right-[2%] w-[120px] sm:w-[150px] lg:w-[220px] rotate-12 z-20">
                <motion.div style={{ x: mouseMoveFastX, y: mouseMoveFastY }} className="w-full h-full">
                  <Image src="/images/app-proov.webp" alt="App Proov" width={400} height={800} className="w-full h-auto" />
                </motion.div>
              </motion.div>

              {/* Orange Bike (Bottom Left) z-30 */}
              <motion.div style={{ y: yFast }} className="absolute top-[45%] lg:top-[40%] left-[5%] lg:left-[10%] w-[320px] sm:w-[450px] lg:w-[700px] -rotate-6 z-30">
                <motion.div style={{ x: mouseMoveSlowX, y: mouseMoveSlowY }} className="w-full h-full">
                  <Image src="/images/configurator-bike.webp" alt="Configurator" width={1000} height={700} className="w-full h-auto" />
                </motion.div>
              </motion.div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
