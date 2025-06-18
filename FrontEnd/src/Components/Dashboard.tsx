import { useState } from "react";
import { useUserContext } from "./Context";
import Projects from "./Projects";
import Account from "./Account";
import Navbar from "./Navbar";
import Home from "./Home";

export type dashSwitch = "Home" | "Projects" | "Account";

const Dashboard = () => {
  const [current, setCurrent] = useState<dashSwitch>("Home");
  const user = useUserContext();

  const dashboardSwitch = (current: dashSwitch) => {
    switch (current) {
      case "Home":
        return <Home />;
      case "Projects":
        return <Projects />;
      case "Account":
        return <Account />;
      default:
        return <Home />;
    }
  };

  return (
    <>
      {user.isLoggedIn && (
        <div className="dash-grid-area">
          <div className="shadow-lg">
            <Navbar current={current} setCurrent={setCurrent} user={user} />
          </div>
          <div className="dash-grid-area-2 text-center bg-black bg-opacity-[0.1] items-center">
            {dashboardSwitch(current)}
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
