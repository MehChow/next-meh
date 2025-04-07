import Image from "next/image";
import { motion } from "framer-motion";
import "@/styles/lenis.css";

interface ColumnProps {
  images: string[];
  y: any;
}

export function Column({ images, y = 0 }: ColumnProps) {
  return (
    <motion.div className="column" style={{ y }}>
      {images.map((src, index) => {
        return (
          <div key={index} className="w-full h-full relative overflow-hidden rounded-4xl">
            <Image src={src} fill alt="image" className="object-cover" />
          </div>
        );
      })}
    </motion.div>
  );
}

export default Column;
