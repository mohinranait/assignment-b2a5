
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { IUser } from "@/types/user.type";


type Props = {
  user: IUser;
}
export function ProfileDropdown({ user }: Props) {


  return (
    <div className="relative flex items-center cursor-pointer gap-2 h-auto   bg-transparent hover:bg-transparent rounded-full">
      <Avatar className="h-9 w-9">
        {/* <AvatarImage src="/avatar.jpg" alt="@shadcn" /> */}
        <AvatarFallback>
          {user?.name?.[0].toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="hidden md:block">
        <p className="font-semibold text-base">
          {user?.name}
        </p>
        <p className="text-gray text-sm leading-3 ">{user?.role}</p>
      </div>
    
    </div>
  );
}