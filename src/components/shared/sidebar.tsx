'use client';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboard } from "lucide-react"
import Link from "next/link"
import Logo from "./Logo"
import { Button } from "../ui/button"
import { logout } from "@/services/logout";
import { useRouter } from "next/navigation";

const projects = [
  {
    name: "Gears",
    url: '/provider/gears',
    icon: LayoutDashboard
  },
  {
    name: "Orders",
    url: '/orders',
    icon: LayoutDashboard
  },
]

export function AppSidebar() {
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    router.replace('/login')
  }
  return (
    <Sidebar>
      <SidebarHeader className=" ">
        <SidebarMenu>
          <SidebarMenuItem className="flex">

            <Logo />

          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {projects.map((project) => (
              <SidebarMenuItem key={project.name}>
                <SidebarMenuButton>
                  <Link href={project.url} className="flex w-full gap-2 items-center">
                    <project.icon />
                    <span>{project.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

      </SidebarContent>
      <SidebarFooter>
        <Button type="button" variant={'destructive'} onClick={() => handleLogout()} >Logout</Button>
      </SidebarFooter>
    </Sidebar>
  )
}