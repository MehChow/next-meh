import Image from "next/image";
import "@/styles/main-background.css";

export function Background() {
  return (
    <div className="background-wrapper">
      <Image
        src="/chisato.png"
        alt="bg-image"
        fill={true}
        priority
        className="absolute object-cover main-background"
      />
    </div>
  );
}

export default Background;
