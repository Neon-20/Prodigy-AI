
import { Avatar } from "@/components/ui/avatar"
import { AvatarImage } from "@/components/ui/avatar"
export const BotAvatar = () =>{
return(
    <Avatar className="h-12 w-12">
        <AvatarImage className="px-1 py-1 -my-2" src="/logo.png"/>
    </Avatar>
)
}