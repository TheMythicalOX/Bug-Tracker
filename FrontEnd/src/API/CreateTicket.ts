import axios from "axios";
import { Ticket } from "../Components/Project";

const CreateTicket = async (ticket: Ticket) => {
  let error = await axios
    .get(`http://localhost:9000/ticketcreate.php/?name=${ticket.title}`, {
      withCredentials: true,
    })
    .then((res) => {
      if (res.data === 1) {
        return "Title Is Invalid.";
      } else if (res.data === 2) {
        return "Title Is Already In Use.";
      } else if (res.data !== "") {
        return "Something went wrong";
      }
    });

  if (error) return error;

  error = await axios
    .post("http://localhost:9000/ticketcreate.php", ticket, {
      withCredentials: true,
    })
    .then((res) => {
      if (res.data === 1) {
        return "Title or Description is invalid";
      } else if (res.data === 6) {
        return "Registration was unsuccessful, Please try again";
      } else if (res.data !== "Ticket Created") {
        return res.data;
      }
    });

  if (error) return error;

  error = await axios
    .post("http://localhost:9000/ticketassign.php", ticket, {
      withCredentials: true,
    })
    .then((res) => {
      if (res.data === 1) {
        return "Username or Email is invalid";
      } else if (res.data === 4) {
        return "Password uses invalid characters";
      } else if (res.data === 6) {
        return "Registration was unsuccessful, Please try again";
      } else if (res.data !== "Ticket Created") {
        return res.data;
      }
    });
  if (error) {
    return error;
  } else {
    return true;
  }
};

export default CreateTicket;
