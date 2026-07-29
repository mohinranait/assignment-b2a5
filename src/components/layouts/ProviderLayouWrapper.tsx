
import { cn } from "@/lib/utils";
import React, { ReactNode,  } from "react";
import { AppSidebar } from "../shared/sidebar";
import { Navbar } from "../shared/NavHeader";
import { getMe } from "@/services/getMe";
import { IUser } from "@/types/user.type";


const AdminMainLayout = async ({ children }: { children: ReactNode }) => {
 
  const res = await getMe();
  const user:IUser = await res.data;


  return (
    <>
      <AppSidebar  />

      <div
        id="content"
        className={cn(
          " w-full max-w-full  ",
          // "peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]",
          "peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]",
          "sm:transition-[width] sm:duration-200 sm:ease-linear",
          "flex h-svh flex-col",
          "group-data-[scroll-locked=1]/body:h-full",
          "has-[main.fixed-main]:group-data-[scroll-locked=1]/body:h-svh",
        )}
      >
        <Navbar user={user} />
        {children}
      </div>
    </>
  );
};

export default AdminMainLayout;
