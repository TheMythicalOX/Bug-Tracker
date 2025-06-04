import axios from "axios";

export type ProjectSub = {
    name: string;
    desc: string;
    pwd: string;
    pwd2: string;
};

const CreateProject = async (proj : ProjectSub) => {
    let error = await axios.get(`http://${
        process.env.REACT_APP_SERVER_IP
    }:9000/projectcreate.php/?name=${
        proj.name
    }`, {withCredentials: true}).then((res) => {
        if (res.data === 1) {
            return "name";
        } else if (res.data === 2) {
            return "Username is already in use";
        } else if (res.data !== "") {
            return "Something went wrong";
        }
    });

    if (error) 
        return error;
    


    error = await axios.post(`http://${
        process.env.REACT_APP_SERVER_IP
    }:9000/projectcreate.php`, proj, {withCredentials: true}).then((res) => {
        if (res.data === 1) {
            return "Username or Email is invalid";
        } else if (res.data === 4) {
            return "Password uses invalid characters";
        } else if (res.data === 6) {
            return "Registration was unsuccessful, Please try again";
        } else if (res.data !== "Project Created") {
            return res.data;
        }
    });

    if (error) 
        return error;
    


    error = await axios.post(`http://${
        process.env.REACT_APP_SERVER_IP
    }:9000/projectassign.php`, proj, {withCredentials: true}).then((res) => {
        if (res.data === 1) {
            return "Username or Email is invalid";
        } else if (res.data === 4) {
            return "Password uses invalid characters";
        } else if (res.data === 6) {
            return "Registration was unsuccessful, Please try again";
        } else if (res.data !== "Project Created") {
            return res.data;
        }
    });
    if (error) {
        return error;
    } else {
        return true;
    }
};

export default CreateProject;
