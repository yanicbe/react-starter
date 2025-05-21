import LightningIcon from "@/ui-components/icons/lightning-icon";
import SupportIcon from "@/ui-components/icons/support-icon";
import { LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarItemI {
  title: string;
  icon: JSX.Element;
  link: string;
  end?: boolean;
  isActive?: boolean;
}

const sidebarLogout = {
  title: "Logout",
  icon: <LogOut />,
  link: "/logout",
  end: true,
};

const sidebarSupport = {
  title: "Support",
  icon: <SupportIcon />,
  link: "/support",
  end: true,
};

const sidebarHome = {
  title: "Dashboard",
  icon: <LightningIcon />,
  link: "/",
};

const Sidebar = () => {
  // const { user } = useUser();

  let sidebarItems: SidebarItemI[] = [];

  // TODO - remove this code as soon as the .env is set up
  sidebarItems.push(sidebarHome);
  sidebarItems.push(sidebarSupport);
  sidebarItems.push(sidebarLogout);

  // TODO - remove the comment from the code below as soon as the .env is set up
  // if (user) {
  //   sidebarItems.push(sidebarLogout);
  //   if (user.userRole === UserRole.Admin) {
  //     sidebarItems.push(sidebarHome);
  //   } else {
  //     sidebarItems.push(sidebarHome);
  //     sidebarItems.push(sidebarSupport);
  //   }
  // }

  const location = useLocation();

  return (
    <div className="flex flex-col fixed min-h-[710px] z-20 items-center bg-[#000000] text-white w-40 h-[calc(100vh-40px)] my-5 rounded-r-[40px] pt-11 pb-9">
      <div className="relative px-2">
        <Link to="/">
          <img src="../logo.png" alt="logo" />
        </Link>
      </div>
      <nav className="flex flex-col gap-2 mt-12">
        {sidebarItems
          .filter((item) => !item.end)
          .map((item, index) => (
            <SidebarItem key={item.link} {...item} isActive={location.pathname === item.link} />
          ))}
      </nav>
      <nav className="flex flex-col gap-1 mt-auto mb-3">
        {sidebarItems
          .filter((item) => item.end)
          .map((item) => (
            <SidebarItem key={item.link} {...item} isActive={location.pathname === item.link} />
          ))}
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon, link, isActive }: SidebarItemI) => {
  return (
    <Link
      to={link}
      className={`rounded-full w-[60px] h-[60px] flex justify-center items-center bg-white hover:bg-opacity-10 ${
        isActive ? "bg-opacity-15" : "bg-opacity-0"
      }`}
    >
      {icon}
    </Link>
  );
};

export default Sidebar;
