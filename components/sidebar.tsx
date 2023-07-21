"use client";

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";

import { cn } from "@/lib/utils";
import { Music, ImageIcon, LayoutDashboard, MessageSquare, VideoIcon, Code, Settings } from "lucide-react";
import {usePathname} from "next/navigation";

const monsterrate = Montserrat({
    weight:"600",
    subsets:["latin"]
})

// Array to hold all our routes
const routes = [{
    label:"Dashboard",
    icon: LayoutDashboard,
    href:"/dashboard",
    color:"text-sky-500",
},{
    label:"Conversation",
    icon: MessageSquare,
    href:"/conversation",
    color:"text-violet-500",
},{
    label:"Image Generation",
    icon: ImageIcon,
    href:"/image",
    color:"text-pink-700",
},{
    label:"Video Generation",
    icon: VideoIcon,
    href:"/video",
    color:"text-orange-700",
},{
    label:"Music Generation",
    icon: Music,
    href:"/music",
    color:"text-emerald-500",
},{
    label:"Code Generation",
    icon: Code,
    href:"/code",
    color:"text-green-700",
},{
    label:"Settings",
    icon: Settings,
    href:"/settings",
}]


const Sidebar = () => {
const pathName = usePathname();

return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-gray-950
    text-white">
    <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
        <div className="relative w-10 h-10 mr-4">
        <Image 
        fill
        alt="Logo"
        src="/logo.png"
        />
        </div>
        <h1 className={cn ("text-2xl font-bold", monsterrate.className)}>Prodigy AI</h1>
        {/* Used cn , because it uses tailwind merge and it can override if it creates conflicts */}
        </Link>
        <div className="space-y-1 ">
        {routes.map((route)=>(
            // Render each route as a link
            <Link href={route.href}
            key={route.href}
            className={cn ("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
            pathName === route.href ? "text-white bg-white/10" : "text-zinc-400")}
            >
            <div className="flex items-center flex-1">
            <route.icon className={cn("h-5 w-5 mr-3",route.color)}/>
            {route.label}
            </div>
            </Link>
        ))}
        </div>
    </div>
    </div>
)
}

export default Sidebar