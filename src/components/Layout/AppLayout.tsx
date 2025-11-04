import { Outlet } from "react-router";
import Tabbar from "./Tabbar";

const AppLayout = () => {
  return (
    <section className="min-h-screen max-w-lg mx-auto">
      <Outlet />
      <Tabbar />
    </section>
  );
};

export default AppLayout;
