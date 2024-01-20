import axios from "axios";
import { UserContextT } from "../Context";

const preLogged = {
  preLoggedIn: (user: UserContextT): boolean => {
    let isGood = false;
    axios
      .post(
        "http://localhost:9000/login.php",
        {
          cookie: true,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data === "Logged in") {
          user.setIsLoggedIn(true);
        }
      });
    return isGood;
  },
};
export default preLogged;
