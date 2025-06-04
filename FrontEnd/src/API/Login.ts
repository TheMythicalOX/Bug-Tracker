import axios from "axios";
import {UserContextT} from "../Components/Context";

const tryLogin = {
    Login: async (name : string, pwd : string, user : UserContextT): Promise < string > => {
        let error = "";
        if (name === "" || pwd === "") {
            return "Please input all fields";
        }
        if (name.indexOf("@") >= 0) 
            name.toLowerCase();
        


        error = await axios.post(`http://${
            process.env.REACT_APP_SERVER_IP
        }:9000/login.php`, {
            name: name,
            pwd: pwd,
            cookie: false,
            withCredentials: true
        }, {withCredentials: true}).then((res) => {
            if (res.data === 1) {
                return "Username or Password is invalid";
            }
            if (res.data === 2) {
                return "Username and Password do not match";
            }
            if (res.data !== "Logged in") {
                return res.data;
            } else 
                return "";
            


        });
        if (error !== "") 
            return error;
        


        user.setUser({name: name});
        user.setIsLoggedIn(true);
        return "";
    }
};
export default tryLogin;
