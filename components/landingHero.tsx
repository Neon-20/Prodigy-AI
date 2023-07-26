"use client";


import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";

export const LandingHero = () =>{
    const {isSignedIn} = useAuth();

    return (
        <div className="text-white font-bold py-36 text-center space-y-5">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extraboldc cursor-pointer">
            <h1>
                Make Your Life Easier with AI
            </h1>
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-green-200 to-green-500 cursor-pointer">
                <TypewriterComponent
                options={{
                    strings: ["Music Generation...", "Code Generation...","Video Generation...","Conversation...","Image Generation...","ChatBot..."],
                    autoStart:true,
                    loop:true
                }}
                />
            </div>
            </div>
            {/* <div className="text-sm md:text-xl font-light text-gray-400">
            Generate Prompts with AI in seconds.
            </div> */}
            <div>
                <Link href={isSignedIn ? "/dashboard":"/sign-up"}>
                    <Button 
                    variant="premium" 
                    className="md:text-lg p-4 md:p-6 rounded-full font-sans">
                        Start Generating for Free.
                    </Button>
                </Link>
            </div>
            <div className="text-zinc-200 text-xs md:text-sm font-normal">
            No credit card required..
            </div>
        </div>
    )
}