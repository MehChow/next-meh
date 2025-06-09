"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";

export function NavigationBar() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-20">
        {/* Yaps */}
        <NavigationMenuItem className="text-white">
          <NavigationMenuTrigger className="text-lg hover:opacity-80">
            Yaps🔥
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <YapsItem title="Apex" image="/apex.jpg" href="/yaps/apex" />
                <YapsItem
                  title="Minecraft"
                  image="/suisei_pixelart.png"
                  href="/yaps/minecraft"
                />
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* Donate */}
        <NavigationMenuItem className="text-white">
          <NavigationMenuLink asChild className="text-lg">
            <Link href="/donate">Donate💰</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        {/* About */}
        <NavigationMenuItem className="text-white">
          <NavigationMenuLink asChild className="text-lg">
            <Link href="/about">About💭</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

interface YapsItemProps {
  title: string;
  image: string;
  href: string;
}

function YapsItem({ title, image, href }: YapsItemProps) {
  return (
    <NavigationMenuLink asChild className="hover:opacity-100 cursor-default">
      <Link href={href} className="hover:opacity-100 cursor-default">
        <div className="font-medium">{title}</div>
        <div className="relative h-[100px] w-auto hover:opacity-90 hover:scale-102 transition-all duration-300 cursor-pointer rounded-md">
          <Image
            src={image}
            alt={title}
            fill
            sizes="100vw"
            className="rounded-sm"
          />
        </div>
      </Link>
    </NavigationMenuLink>
  );
}

export default NavigationBar;
