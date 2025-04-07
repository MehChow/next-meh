import GalleryParallax from "@/components/main/gallery-parallax";
import ImageTitle from "@/components/main/image-title";

export default function HomePage() {
  return (
    <main className="max-w-[2400px] w-full">
      <ImageTitle />
      <GalleryParallax />
      <div className="h-[100vh] bg-transparent"></div>
    </main>
  );
}
