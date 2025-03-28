import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  color?: string;
  paddingTop?: string;
}

export function Logo({ color, paddingTop }: LogoProps) {
  return (
    <Link
      href="/"
      className={`text-4xl font-bold flex items-center gap-4 absolute left-0 pl-6 z-99 ${color} ${paddingTop}`}
    >
      <Image src="/logo.png" alt="Logo" width={75} height={75} quality={100} />
      Dynamic
    </Link>
  );
}

export default Logo;
