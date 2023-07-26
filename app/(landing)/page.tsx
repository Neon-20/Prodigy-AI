
import { LandingContent } from "@/components/landingContent";
import { LandingHero } from "@/components/landingHero";
import { LandingNavbar } from "@/components/landingNavbar";
import { Button } from "@/components/ui/button";

// This is the landing page 
    
export default function DashboardPage(){
    return (
        <div className="h-full">
            <LandingNavbar/>
            <LandingHero/>
            <LandingContent/>
        </div>
    )
}