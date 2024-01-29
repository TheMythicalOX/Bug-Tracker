import axios from "axios";
import { projectDisplay } from "../Components/Projects";

const GetProjects = async (): Promise<projectDisplay[]> => {
  return await axios
    .post("http://localhost:9000/getprojects.php", null, {
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
