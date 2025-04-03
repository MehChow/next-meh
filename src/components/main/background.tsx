import Image from "next/image";
import "@/styles/main-background.css";

export function Background() {
  return (
    <Image
      src="/main-bg.avif"
      alt="bg-image"
      fill={true}
      priority
      className="object-cover main-background"
    />
  );
}

export default Background;
