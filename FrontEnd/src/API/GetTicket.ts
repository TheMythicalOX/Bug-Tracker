import axios from "axios";
import { TicketDisplay } from "../Components/Project";

const GetTicket = async (project: string): Promise<TicketDisplay | null> => {
  return await axios
    .post(`https://${process.env.REACT_APP_SERVER_IP}/getticket.php`, {
      project: project,
    })
    .then((res) => {
      if (typeof res.data === "object") {
        const tmp: TicketDisplay = {
          title: project,
          desc: res.data[0]["description"],
          severity: res.data[0]["severity"],
          status: res.data[0]["status"],
        };
        return tmp;
      } else {
        return null;
      }
    });
};

export default GetTicket;
