import axios from "axios";
import { UserDisplay } from "../Components/AdminPanel";

const GetUsers = async (project: string): Promise<UserDisplay[]> => {
  return await axios
    .post(`https://${process.env.REACT_APP_SERVER_IP}/getusers.php`, {
      project: project,
    })
    .then((res) => {
      if (res.data === 1) {
        return [
          {
            username: "no projects",
          },
        ];
      } else {
        return res.data;
      }
    });
};

export default GetUsers;
