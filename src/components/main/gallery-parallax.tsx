"use client";

import { allImages } from "@/constant/image-swiper";
import { useTransform, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import useDimension from "@/hooks/use-dimension";
import "@/styles/lenis.css";
import "@/styles/gallery.css";
import Column from "./column";

export function GalleryParallax() {
  const container = useRef(null);
  const [columnCount, setColumnCount] = useState(4); // Default to 4 columns
  const { height, width } = useDimension();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, height * 1.8]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 2.3]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (width < 1130) {
        setColumnCount(2); // 2 columns below 1130px
      } else if (width < 1500) {
        setColumnCount(3); // 3 columns between 1130px and 1400px
      } else {
        setColumnCount(4); // 4 columns at 1400px and above
      }
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={container}
      className="h-[175vh] flex rgb(45,45,45) flex-row gap-4 p-4 overflow-hidden relative"
    >
      {/* Conditionally render columns based on columnCount */}
      {columnCount >= 1 && <Column images={[allImages[0], allImages[1], allImages[2]]} y={y1} />}
      {columnCount >= 2 && <Column images={[allImages[3], allImages[4], allImages[5]]} y={y2} />}
      {columnCount >= 3 && <Column images={[allImages[6], allImages[7], allImages[8]]} y={y3} />}
      {columnCount >= 4 && <Column images={[allImages[9], allImages[10], allImages[11]]} y={y4} />}
      <div className="fade-overlay" />
    </div>
  );
}

export default GalleryParallax;
