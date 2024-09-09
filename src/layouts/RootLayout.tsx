import { Outlet } from "react-router-dom";
import LeftBar from "../components/shared/LeftBar";
import TopBar from "../components/shared/TopBar";
import BottomBar from "../components/shared/BottomBar";

export default function RootLayout() {
  return (
    <div className="w-full h-screen grid grid-cols-1 grid-rows-[auto_1fr_auto] md:grid-cols-[auto_1fr] md:grid-rows-1">
      <TopBar />
      <LeftBar />
      <main className="w-full h-full overflow-scroll">
        <Outlet />
      </main>
      <BottomBar />
    </div>
  );
}
