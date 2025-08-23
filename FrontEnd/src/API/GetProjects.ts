import axios from "axios";
import { projectDisplay } from "../Components/Projects";

const GetProjects = async (): Promise<projectDisplay[]> => {
  return await axios
    .post(`https://${process.env.REACT_APP_SERVER_IP}/getprojects.php`, null, {
      withCredentials: true,
    })
    .then((res) => {
      if (res.data === 1) {
        return "no projects";
      } else {
        return res.data;
      }
    });
};

export default GetProjects;
