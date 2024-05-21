import { Outlet } from "react-router-dom";
import SideBarNavigation from "../components/SideBarNavigation";

const RootLayout = () => {
  return (
    <div className="flex flex-row h-svh w-full">
      <aside className="h-full hidden md:flex">
        <SideBarNavigation />
      </aside>
      <div className="h-full w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
