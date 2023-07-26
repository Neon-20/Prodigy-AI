import NavBar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription-check";

const DashboardLayout = async({
    children
}:{
    children:React.ReactNode;
}) =>{

    const apiLimitCount = await getApiLimitCount();
    const isPro = await checkSubscription();
// Going from server component to client compo., so we have to pass it like a prop.

    return(
        <div className="h-full relative">
        <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed
        md:inset-y-0 bg-black text-white">
            {/* Above line creates the sidebar */}

        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
        </div>
        {/*  */}
        <main className="md:pl-72 ">
            <NavBar/>
            {children}
        </main>
        </div>
    )
}

export default DashboardLayout;