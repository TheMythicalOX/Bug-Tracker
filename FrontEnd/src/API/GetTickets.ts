import axios from "axios";
import { TicketDisplay } from "../Components/Project";

const GetTickets = async (project: string): Promise<TicketDisplay[]> => {
  return await axios
    .post(
      "http://localhost:9000/gettickets.php",
      { project: project },
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      if (res.data === 1) {
        return [{ title: "no projects" }];
      } else {
        return res.data;
      }
    });
};

export default GetTickets;
