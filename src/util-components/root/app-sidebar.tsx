import { UserInfoUserRole } from "@/lib/api/interfaces/user-profile.interface";
import { cn } from "@/lib/utils/cn";
import { hasRolePermission } from "@/lib/utils/role-manager";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui-components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/ui-components/ui/sidebar";
import { ChevronUp, Home, LogOut, Settings, User2, Wrench } from "lucide-react";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "./context";

const sidebarHome = {
  title: "Home",
  url: "/",
  icon: Home,
};

const sidebarAdmin = {
  title: "Admin",
  url: "/admin",
  icon: Wrench,
};

const bottomMenuSettings = {
  title: "Settings",
  url: "/settings",
  icon: Settings,
};

const bottomMenuSignOut = {
  title: "Sign out",
  url: "/sign-out",
  icon: LogOut,
};

const AppSidebar = () => {
  const excludeSidebar = ["/register", "/reset", "/verification/mail"];
  const { user } = useContext(Context);

  const location = useLocation();

  if (excludeSidebar.includes(location.pathname) || !user) {
    return null;
  }

  const sidebarItems = [];

  sidebarItems.push(sidebarHome);
  if (hasRolePermission(user.userRole, UserInfoUserRole.ADMIN)) {
    sidebarItems.push(sidebarAdmin);
  }

  const bottomMenuItems = [];

  bottomMenuItems.push(bottomMenuSettings);
  bottomMenuItems.push(bottomMenuSignOut);

  return (
    <Sidebar>
      <SidebarHeader className="py-6">
        <div className="relative px-4">
          <Link to="/">
            <img src="../logo-black.png" alt="logo" className="h-20" />
          </Link>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 py-4">
        <SidebarMenu className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    to={item.url}
                    className={cn(
                      "transition-colors",
                      isActive ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                    )}
                  >
                    <item.icon className={cn(isActive ? "text-primary" : "text-muted-foreground")} />
                    <span>{item.title}</span>
                    {isActive && (
                      <div className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-md bg-primary" />
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="py-4 px-2 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="hover:bg-muted transition-colors">
                  <User2 className="text-muted-foreground" />
                  <span className="font-medium">Username</span>
                  <ChevronUp className="ml-auto text-muted-foreground" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-[--radix-popper-anchor-width]">
                {bottomMenuItems.map((item) => (
                  <DropdownMenuItem key={item.title} className="hover:bg-muted cursor-pointer">
                    <Link to={item.url} className="flex items-center gap-2 w-full">
                      <item.icon className="text-muted-foreground" />
                      <span>{item.title}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
