import { Outlet } from "react-router-dom";
import SideBarNavigation from "../components/SideBarNavigation";

const RootLayout = () => {
  return (
    <div className="flex flex-row h-screen w-full">
      <aside>
        <SideBarNavigation />
      </aside>
      <div className="h-full w-full overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
