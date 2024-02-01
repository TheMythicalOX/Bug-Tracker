import axios from "axios";
import { JoinRequestDisplay } from "../Components/AdminPanel";

const GetJoinRequests = async (
  project: string
): Promise<JoinRequestDisplay[]> => {
  return await axios
    .post("http://localhost:9000/getjoinrequests.php", { project: project })
    .then((res) => {
      if (res.data === 1) {
        return [{ username: "no projects" }];
      } else {
        return res.data;
      }
    });
};

export default GetJoinRequests;
