import axios from "axios";
import {UserContextT} from "../Components/Context";

const Logout = (user : UserContextT) => {
    return axios.post(`http://${
        process.env.REACT_APP_SERVER_IP
    }:9000/login.php`, {
        logout: true
    }, {withCredentials: true}).then((res) => {
        if (res.data === "Logged out") {
            user.setIsLoggedIn(false);
        }
    });
};

export default Logout;
