import { dashSwitch } from "./Dashboard";
import { UserContextT } from "./Context";
import Logout from "../API/Logout";
import { useState } from "react";

const Navbar = (props: {
  current: dashSwitch;
  setCurrent: Function;
  user: UserContextT;
}) => {
  const [tryLogout, setTryLogout] = useState(false);
  // const user = useUserContext();

  const enabled = `lg:grid shadow shadow-stone-400 row-span-1 text-center items-center transition-colors duration-500 hover:bg-stone-400`;
  const disabled = `lg:grid shadow shadow-stone-400 row-span-1 text-center items-center transition-colors bg-stone-400`;
  let first = enabled;
  let second = enabled;
  let third = enabled;
  switch (props.current) {
    case "Home":
      first = disabled;
      break;
    case "Projects":
      second = disabled;
      break;
    case "Account":
      third = disabled;
      break;
    default:
      break;
  }
  const handleLogOut = (e: React.FormEvent) => {
    e.preventDefault();
    Logout(props.user);
  };

  return (
    <>
      <div className="dash-grid-area-1 row-span-1">
        <div className={`bg-back col-span-2 h-screen grid grid-rows-10`}>
          <div
            className={`shadow shadow-stone-400 grid row-span-1 text-center items-center `}
          >
            <img
              src={require("../Images/Logo.png")}
              alt="TMP"
              className="w-[50%] m-auto"
            />
          </div>
          <div className="grid row-span-2">
            <div
              onClick={() => {
                if (props.current !== "Home") props.setCurrent("Home");
              }}
              className={first}
            >
              <h2>Home</h2>
            </div>
            <div
              onClick={() => {
                if (props.current !== "Projects") props.setCurrent("Projects");
              }}
              className={second}
            >
              <h2>Projects</h2>
            </div>
            <div
              onClick={() => {
                if (props.current !== "Account") props.setCurrent("Account");
              }}
              className={third}
            >
              <h2>Account</h2>
            </div>
            <div
              className={enabled}
              onClick={() => {
                setTryLogout(true);
              }}
            >
              <h2>Logout</h2>
            </div>
            {tryLogout && (
              <div
                onClick={() => {
                  setTryLogout(false);
                }}
                className="h-screen w-screen absolute inset-0 grid justify-center items-center filter backdrop-blur-sm"
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="ml-40 bg-stone-300 shadow-stone-600 shadow-2xl grid h-1/3 text-center items-center rounded-3xl"
                >
                  <h2 className="text-3xl p-10">
                    Are You Sure You Want To Logout?
                  </h2>
                  <div className="grid gap-10 justify-center">
                    <button
                      className="bg-blue-500 text-2xl p-3 px-16 rounded-3xl"
                      onClick={handleLogOut}
                    >
                      Logout
                    </button>
                    <button
                      className="bg-stone-400 text-2xl p-3 px-16 rounded-3xl"
                      onClick={() => {
                        setTryLogout(false);
                      }}
                    >
                      Go Back
                    </button>
                  </div>
                </div>
              </div>
            )}{" "}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
