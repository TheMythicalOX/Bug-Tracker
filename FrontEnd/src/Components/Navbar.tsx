import { dashSwitch } from "./Dashboard";
import { UserContextT } from "./Context";
import Logout from "../API/Logout";

const Navbar = (props: {
  current: dashSwitch;
  setCurrent: Function;
  user: UserContextT;
}) => {
  const enabled =
    "lg:grid shadow shadow-stone-950 row-span-1 text-center items-center transition-colors duration-500 hover:bg-stone-950";
  const disabled =
    "lg:grid shadow shadow-stone-950 row-span-1 text-center items-center transition-colors bg-stone-950";
  let first = enabled;
  let second = enabled;
  let third = enabled;
  let fourth = enabled;
  switch (props.current) {
    case "Home":
      first = disabled;
      break;
    case "Projects":
      second = disabled;
      break;
    case "Tickets":
      third = disabled;
      break;
    case "Account":
      fourth = disabled;
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
      <div className="dash-grid-area-1 row-span-2">
        <div className="bg-stone-900 col-span-2 h-screen grid grid-rows-10">
          <div className="grid row-span-1 text-center items-center ">
            <h1>Logo</h1>
          </div>
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
              if (props.current !== "Tickets") props.setCurrent("Tickets");
            }}
            className={third}
          >
            <h2>Tickets</h2>
          </div>
          <div
            onClick={() => {
              if (props.current !== "Account") props.setCurrent("Account");
            }}
            className={fourth}
          >
            <h2>Account</h2>
          </div>
          <div className={enabled} onClick={handleLogOut}>
            <h2>Logout</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
