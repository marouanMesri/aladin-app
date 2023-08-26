"use client";

import Image from "next/image";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  ImageIcon,
  Laptop,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  Video,
} from "lucide-react";

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-300",
  },
  {
    label: "Chat ",
    icon: MessageSquare,
    href: "/chat",
    color: "text-emerald-400",
  },
  {
    label: "Images",
    icon: ImageIcon,
    href: "/image",
    color: "text-orange-500",
  },
  {
    label: "Vidéos",
    icon: Video,
    href: "/video",
    color: "text-pink-600",
  },
  {
    label: "Musiques",
    icon: Music,
    href: "/music",
    color: "text-sky-400",
  },
  {
    label: "Code",
    icon: Laptop,
    href: "/code",
    color: "text-green-600",
  },
  {
    label: "Paramètres",
    icon: Settings,
    href: "/settings",
    color: "text-gray-600",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  console.log("PATHNAME:", pathname);
  return (
    <div className="space-y-4 py-4' flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-10 h-10 mr-4">
            <Image fill alt="Logo" src="/img/aladin-logo.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            {" "}
            Aladin{" "}
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link href={route.href} key={route.href}>
              <div
                className={cn(
                  `flex items-center flex-1 px-3 py-2 rounded-md hover:bg-gray-700 ${
                    route.href == pathname ? `bg-[#111827]` : ""
                  } hover:text-white`,
                  route.color
                )}
              >
                <route.icon className="w-6 h-6 mr-2" />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
