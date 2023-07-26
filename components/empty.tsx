import Image from "next/image";

interface EmptyProps{
    label:string;
}

export const Empty = ({
    label
}:EmptyProps) =>{
    return(
        <div className="h-full p-30 flex flex-col items-center justify-center">
            <div className="relative h-80 w-72">
                <Image
                alt="Empty"
                fill
                src="/value.png"
                />
            </div>
            <p className="m-0 pl-4 text-muted-foreground text-sm text-center animate-pulse">
                {label}
            </p>
        </div>
    )
}