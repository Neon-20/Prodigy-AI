
import Image from "next/image"

export const Loader = () =>{
    return(
        <div className="h-full flex flex-col gap-y-4 items-center
        justify-center">
        <div className="w-14 h-14 relative animate-pulse">
        <Image
        alt="logo"
        fill
        src="/logo.png"
        />
        </div>
        <p className="text-sm text-white">
        Prodigy is Analysing...
        </p>
        </div>
    )
}