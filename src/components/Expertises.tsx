"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";

const expertises = [
  {
    title: "Design UI & UX",
    image: "/images/dashboard-home.webp"
  },
  {
    title: "Branding",
    image: "/images/InMyMind.webp"
  },
  {
    title: "Développement Web",
    image: "/images/selfiebox-site.webp"
  }
];

const tools = [
  { file: "ps.svg", name: "Photoshop" },
  { file: "ai.svg", name: "Illustrator" },
  { file: "cc.svg", name: "Creative Cloud" },
  { file: "figma.svg", name: "Figma" },
  { file: "vscode.svg", name: "VS Code" },
  { file: "wp.svg", name: "WordPress" },
  { file: "elementor.svg", name: "Elementor" }
];

export default function Expertises() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 30%"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 22,
    restDelta: 0.001
  });

  return (
    <section ref={sectionRef} id="services" className="relative py-24 lg:py-32 bg-white text-dark overflow-hidden">
      
      {/* Lusion-inspired Scroll-traced Blue Line */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <svg
          viewBox="0 0 1200 900"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="expertisesLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#376EFE" stopOpacity="0.2" />
              <stop offset="30%" stopColor="#376EFE" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#8BA7FF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#376EFE" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Halo d'ambiance */}
          <motion.path
            d="M 50,150 C 350,100 550,550 850,380 C 1050,260 1150,480 1180,820"
            stroke="#376EFE"
            strokeWidth="14"
            strokeOpacity="0.12"
            strokeLinecap="round"
            fill="none"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength }}
            className="blur-md"
          />

          {/* Ligne nette dégradée */}
          <motion.path
            d="M 50,150 C 350,100 550,550 850,380 C 1050,260 1150,480 1180,820"
            stroke="url(#expertisesLineGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength }}
          />

          {/* Cœur lumineux */}
          <motion.path
            d="M 50,150 C 350,100 550,550 850,380 C 1050,260 1150,480 1180,820"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeOpacity="0.5"
            strokeLinecap="round"
            fill="none"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength }}
          />
        </svg>
      </div>

      <div className="max-w-[1296px] w-full mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-20">
          <h2 className="text-5xl lg:text-7xl font-light tracking-tight">
            Mes <span className="text-primary font-bold">Expertises</span>
          </h2>
          <p className="max-w-xl text-lg text-dark/80 leading-relaxed font-medium">
            Lorem ipsum dolor sit amet consectetur. Duis morbi ut at commodo sem integer id tempor elit. Duis fringilla diam aliquet sit convallis facilisi. Hendrerit congue odio mollis bibendum nulla.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-28">
          {expertises.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative w-full aspect-[422/530] group"
            >
              {/* Masked Card Content */}
              <div 
                className="bg-[#DEE8FF] pt-10 lg:pt-12 relative flex flex-col w-full h-full overflow-hidden"
                style={{
                  WebkitMaskImage: "url('/icons/card-mask.svg')",
                  WebkitMaskSize: "100% 100%",
                  WebkitMaskRepeat: "no-repeat",
                  maskImage: "url('/icons/card-mask.svg')",
                  maskSize: "100% 100%",
                  maskRepeat: "no-repeat"
                }}
              >
                <h3 className="text-2xl lg:text-3xl font-bold px-8 lg:px-10 mb-8">{item.title}</h3>
                
                {/* Stacked Image Effect */}
                <div className="relative flex-1 mt-auto w-full">
                  <div className="absolute inset-0 bg-[#0F1F4A]" />
                  <div className="absolute inset-x-0 top-6 bottom-0 bg-[#1D3C92]" />
                  <div className="absolute inset-x-0 top-12 bottom-0 overflow-hidden bg-gradient-to-br from-[#2C4FA5] to-primary">
                    {/* Les photos ont été remplacées par un fond dégradé selon votre demande */}
                  </div>
                </div>
              </div>

              {/* Arrow Button placed in the hole */}
              <button className="absolute bottom-[3%] right-[3%] w-[25%] h-[20%] max-w-[120px] max-h-[120px] min-w-[80px] min-h-[80px] aspect-square bg-primary rounded-full flex justify-center items-center text-white hover:scale-110 transition-transform z-10 shadow-lg">
                <Image src="/icons/arrow-up-right.svg?v=2" alt="Go" width={40} height={40} className="w-1/2 h-1/2 brightness-0 invert group-hover:rotate-45 transition-transform duration-300" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Tools row */}
        <div className="flex flex-wrap justify-between items-center gap-6 px-4 lg:px-12">
          {tools.map((tool, index) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 relative hover:-translate-y-2 transition-transform duration-300 group cursor-pointer"
            >
              <Image 
                src={`/icons/${tool.file}`} 
                alt={tool.name} 
                fill
                className="object-contain" 
              />
              {/* Tooltip */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-dark text-white text-xs font-bold py-1.5 px-3 rounded-lg whitespace-nowrap pointer-events-none shadow-md z-20">
                {tool.name}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
