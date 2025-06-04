import axios from "axios";
import {UserContextT} from "../Components/Context";

const preLogged = {
    preLoggedIn: async (user : UserContextT) => {
        await axios.post(`http://172.22.20.64:9000/login.php`, {
            cookie: true
        }, {withCredentials: true}).then((res) => {
            if (res.data === "Logged in") {
                user.setUser({name: user.user.name});
                user.setIsLoggedIn(true);
            }
        });
        return;
    }
};
export default preLogged;
