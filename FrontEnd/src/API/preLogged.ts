import axios from "axios";
import { UserContextT } from "../Components/Context";

const preLogged = {
  preLoggedIn: async (user: UserContextT) => {
    await axios
      .post(
        "http://localhost:9000/login.php",
        {
          cookie: true,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data === "Logged in") {
          user.setUser({ name: user.user.name });
          user.setIsLoggedIn(true);
        }
      });
    return;
  },
};
export default preLogged;
