import axios from "axios";
import { UserContextT } from "../Components/Context";

const preLogged = {
  preLoggedIn: async (user: UserContextT) => {
    await axios
      .post(
        `https://${process.env.REACT_APP_SERVER_IP}/login.php`,
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
