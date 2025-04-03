"use client";

import { allImages } from "@/constant/image-swiper";
import { useTransform, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import useDimension from "@/hooks/use-dimension";
import ImageTitle from "@/components/main/image-title";
import "@/styles/lenis.css";
import Column from "./column";

export function GalleryParallax() {
  const container = useRef(null);
  const { height } = useDimension();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main className="max-w-[2400px] w-[80%]">
      <ImageTitle />

      <div className="h-[175vh] flex rgb(45,45,45) flex-row gap-4 p-4 overflow-hidden relative">
        <Column images={[allImages[0], allImages[1], allImages[2]]} y={y1} />
        <Column images={[allImages[3], allImages[4], allImages[5]]} y={y2} />
        <Column images={[allImages[6], allImages[7], allImages[8]]} y={y3} />
        <Column images={[allImages[9], allImages[10], allImages[11]]} y={y4} />
      </div>
      <div className="h-[100vh]"></div>
    </main>
  );
}

export default GalleryParallax;
