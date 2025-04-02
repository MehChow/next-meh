"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "@/styles/image-swiper.css";

import Image from "next/image";
import { Autoplay } from "swiper/modules";

interface ImageSwiperProps {
  images: string[];
  className?: string;
}
export function ImageSwiper({ images, className }: ImageSwiperProps) {
  return (
    <Swiper
      loop={true}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        reverseDirection: true,
      }}
      speed={10000}
      modules={[Autoplay]}
      className="bg-red-200 rounded-4xl"
      breakpoints={{
        1792: {
          direction: "vertical",
          slidesPerView: 1.3,
        },
        1280: {
          direction: "horizontal",
          slidesPerView: 5.5, // More slides on larger screens to reduce gaps
        },
        1024: {
          direction: "horizontal",
          slidesPerView: 3,
        },
        768: {
          direction: "horizontal",
          slidesPerView: 3,
        },
        640: {
          direction: "horizontal",
          slidesPerView: 3,
        },
      }}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index} className="swiper-slide">
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src={image}
              layout="fill"
              alt="image"
              className="3xl:p-4 hover:scale-105 hover:opacity-90 transition-all"
              objectFit="contain"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ImageSwiper;
