import Image from "next/image";
import React from "react";

export default function ApexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Image
        src="/pathfinder-background.jpg"
        alt="Pathfinder background"
        objectFit="cover"
        quality={100}
        fill
        sizes="100vw"
        className="opacity-40"
      />
      {children}
    </div>
  );
}
