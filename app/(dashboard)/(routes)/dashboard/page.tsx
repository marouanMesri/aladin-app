"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  ImageIcon,
  Laptop,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  Video,
} from "lucide-react";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-300",
    bgColor: "bg-sky-300/10",
  },
  {
    label: "Chat ",
    icon: MessageSquare,
    href: "/chat",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
  },
  {
    label: "Images",
    icon: ImageIcon,
    href: "/image",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
  {
    label: "Vidéos",
    icon: Video,
    href: "/video",
    color: "text-pink-600",
    bgColor: "bg-pink-600/10",
  },
  {
    label: "Musiques",
    icon: Music,
    href: "/music",
    color: "text-sky-400",
    bgColor: "bg-sky-400/10",
  },
  {
    label: "Code",
    icon: Laptop,
    href: "/code",
    color: "text-green-600",
    bgColor: "bg-green-600/10",
  },
  {
    label: "Paramètres",
    icon: Settings,
    href: "/settings",
    color: "text-gray-600",
    bgColor: "bg-gray-600/10",
  },
];

const DashboardPage = () => {
  const router = useRouter();

  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl ml-1 md:text-4xl font-bold text-center">
          {" "}
          Explorer le pouvoir de l'IA{" "}
        </h2>
        <p className="text-muted-foreground font-light">
          Utilisez les plus intelligentes des intelligences artificielles au
          même endroit.
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            key={tool.href}
            onClick={() => router.push(tool.href)}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-6 h-6", tool.color)} />
              </div>
            </div>
            <div className="font-semibold">{tool.label}</div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
