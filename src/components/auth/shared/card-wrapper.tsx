"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import "@/styles/gradient-border.css";

type CardWrapperProps = {
  title: string;
  children: React.ReactNode;
  gradient: "signin-card" | "signup-card";
};

export function CardWrapper({ title, children, gradient }: CardWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45, ease: "easeInOut" }}
      layout
      className={`p-1 ${gradient} rounded-xl`}
    >
      <Card className="bg-black px-4 relative border-none">
        <CardHeader>
          <CardTitle className="text-3xl text-center text-white">{title}</CardTitle>
        </CardHeader>

        <CardContent>{children}</CardContent>
      </Card>
    </motion.div>
  );
}

export default CardWrapper;
