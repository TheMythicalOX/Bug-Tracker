import axios from "axios";

const JoinResponse = async (res: string, name: string, project: string) => {
  return await axios
    .post("http://localhost:9000/joinresponse.php", {
      response: res,
      name: name,
      project: project,
    })
    .then((res) => {
      if (res.data === "Successful") {
        return true;
      } else {
        return false;
      }
    });
};

export default JoinResponse;
