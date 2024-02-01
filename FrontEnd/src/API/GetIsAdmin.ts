import axios from "axios";

const GetIsAdmin = async (project: string): Promise<boolean> => {
  return await axios
    .post(
      "http://localhost:9000/projectadmin.php",
      { project },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      if (res.data === "User Is Admin") {
        return true;
      } else {
        return false;
      }
    });
};

export default GetIsAdmin;
