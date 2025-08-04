import axios from "axios";

const CompleteTicket = async (ticket: {
  title: string;
  project: string;
  status: string;
}) => {
  let error = await axios
    .post(
      `http://${process.env.REACT_APP_SERVER_IP}:9000/ticketcomplete.php`,
      ticket,
      { withCredentials: true }
    )
    .then((res) => {
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

  if (error) return error;
  return true;
};

export default CompleteTicket;
