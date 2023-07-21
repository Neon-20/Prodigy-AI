
import { Button } from "@/components/ui/button";
import Link from "next/link";

// This is the landing page 
    
export default function DashboardPage(){
    return <>
    <div className="flex px-6 py-4"> Hello from the Root (Unprotected) 
        <div>
            <Link href="/sign-in">
            <Button>
                Login
            </Button>
            </Link>
            <Link href="/sign-up">
            <Button>
                Register
            </Button>
            </Link>
        </div>
    </div>
    </>
}