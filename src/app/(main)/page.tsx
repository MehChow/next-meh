import Image from "next/image";
import ImageSwiper from "@/components/main/image-swiper";
import { firstSwiperImages, secondSwiperImages } from "@/constant/image-swiper";

export default function HomePage() {
  return (
    <div className="flex-col flex justify-start items-center">
      <div className="text-center py-10 space-y-4">
        <h1 className="text-8xl font-bold tracking-widest">DYNAMIC</h1>
        <h2 className="text-2xl">Here is the subtitle</h2>
      </div>

      <div className="flex flex-col 3xl:flex-row max-w-[2000px] 3xl:w-[90%] w-full relative gap-4">
        <ImageSwiper images={firstSwiperImages} />

        <div className="main-img relative 3xl:rounded-4xl">
          <Image
            src="/image-swiper/herta_main.jpg"
            fill
            alt="image"
            className="3xl:rounded-4xl object-cover"
          />
          <div className="text-white absolute right-0 bottom-0 p-8 text-6xl font-bold">
            This is description
          </div>
        </div>

        <ImageSwiper images={secondSwiperImages} />
      </div>
    </div>
  );
}
