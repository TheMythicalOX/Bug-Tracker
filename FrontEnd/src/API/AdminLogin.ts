import axios from "axios";

const AdminLogin = async (project: string, pwd: string): Promise<string> => {
  let error = "";
  error = await axios
    .post(
      "http://localhost:9000/adminlogin.php",
      {
        project: project,
        pwd: pwd,
      },
      { withCredentials: true }
    )
    .then((res) => {
      if (res.data === 1) {
        return "Password is invalid";
      }
      if (res.data === "Logged in") {
        return "";
      } else {
        return res.data;
      }
    });
  return error;
};

export default AdminLogin;
