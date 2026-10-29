"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    title: "Inside 71",
    expertise: "Branding",
    image: "/images/InMyMind.webp"
  },
  {
    title: "Selfiebox",
    expertise: "Développement Web",
    image: "/images/selfiebox-site.webp"
  },
  {
    title: "Dashboard SaaS",
    expertise: "Design UI & UX",
    image: "/images/dashboard-home.webp"
  },
  {
    title: "Configurateur Vélo",
    expertise: "Design UI & UX",
    image: "/images/configurator-bike.webp"
  }
];

export default function Productions() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const lineProgress = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);

  // Inertie fluide inspirée de Lusion avec physics spring
  const pathLength = useSpring(lineProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001
  });

  return (
    <section ref={sectionRef} id="portfolio" className="relative py-24 lg:py-32 text-dark overflow-hidden">
      
      {/* Lusion-inspired Scroll-traced Blue Line */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-[1] overflow-hidden">
        <svg
          viewBox="0 0 1200 1600"
          fill="none"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="prodLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#376EFE" stopOpacity="0.4" />
              <stop offset="25%" stopColor="#376EFE" />
              <stop offset="50%" stopColor="#6E9BFE" />
              <stop offset="75%" stopColor="#376EFE" />
              <stop offset="100%" stopColor="#376EFE" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Halo d'ambiance large */}
          <motion.path
            d="M 120,60 C 500,40 1080,180 1060,460 C 1040,740 100,680 100,1020 C 100,1340 720,1480 1120,1560"
            stroke="#376EFE"
            strokeWidth="18"
            strokeOpacity="0.25"
            strokeLinecap="round"
            fill="none"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength }}
            className="blur-md"
          />

          {/* Lueur médiane */}
          <motion.path
            d="M 120,60 C 500,40 1080,180 1060,460 C 1040,740 100,680 100,1020 C 100,1340 720,1480 1120,1560"
            stroke="#6894FE"
            strokeWidth="8"
            strokeOpacity="0.5"
            strokeLinecap="round"
            fill="none"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength }}
            className="blur-[2px]"
          />

          {/* Ligne principale nette et dégradée */}
          <motion.path
            d="M 120,60 C 500,40 1080,180 1060,460 C 1040,740 100,680 100,1020 C 100,1340 720,1480 1120,1560"
            stroke="url(#prodLineGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength }}
          />

          {/* Cœur lumineux fin pour l'effet fibre optique / laser */}
          <motion.path
            d="M 120,60 C 500,40 1080,180 1060,460 C 1040,740 100,680 100,1020 C 100,1340 720,1480 1120,1560"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeOpacity="0.8"
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
            Mes dernières <br />
            <span className="text-primary font-bold">Productions</span>
          </h2>
          <p className="max-w-xl text-lg text-dark/80 leading-relaxed font-medium">
            Lorem ipsum dolor sit amet consectetur. Duis morbi ut at commodo sem integer id tempor elit. Duis fringilla diam aliquet sit convallis facilisi. Hendrerit congue odio mollis bibendum nulla.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {projects.map((project, index) => (
            <motion.a 
              href="#"
              data-cursor-type="project"
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group block"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] rounded-[40px] overflow-hidden mb-6 bg-gradient-to-br from-[#1D3C92] to-primary shadow-xl">
                {/* Image temporairement retirée à la demande */}
              </div>

              {/* Text */}
              <div className="px-2">
                <h3 className="text-3xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                <p className="text-xl text-dark/70 font-medium">{project.expertise}</p>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
