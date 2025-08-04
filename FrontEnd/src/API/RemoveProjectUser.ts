import axios from "axios";

const RemoveProjectUser = async (email: string, project: string) => {
  return await axios
    .post(
      `http://${process.env.REACT_APP_SERVER_IP}:9000/removeprojectuser.php`,
      {
        email: email,
        project: project,
      }
    )
    .then((res) => {
      if (res.data === "Successful") {
        return true;
      } else {
        return false;
      }
    });
};

export default RemoveProjectUser;
