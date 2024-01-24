import React, { useState } from "react";
import { useUserContext } from "./Context";
import Projects from "./Projects";
import Tickets from "./Tickets";
import Account from "./Account";
import Navbar from "./Navbar";
import Home from "./Home";
import Info from "./Info";

export type dashSwitch = "Home" | "Projects" | "Tickets" | "Account" | "Info";

const Dashboard = () => {
  const [current, setCurrent] = useState<dashSwitch>("Home");
  const user = useUserContext();

  const dashboardSwitch = (current: dashSwitch) => {
    switch (current) {
      case "Home":
        return <Home />;
      case "Projects":
        return <Projects />;
      case "Tickets":
        return <Tickets />;
      case "Account":
        return <Account />;
      case "Info":
        return <Info />;
      default:
        return <Home />;
    }
  };

  return (
    <>
      {user.isLoggedIn && (
        <div className="dash-grid-area">
          <Navbar current={current} setCurrent={setCurrent} user={user} />
          <div className="dash-grid-area-3 text-center items-center">
            {dashboardSwitch(current)}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
