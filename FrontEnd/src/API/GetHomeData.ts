import axios from "axios";
import { StatsData } from "../Components/Home";

const GetHomeData = async (): Promise<StatsData | null> => {
  return await axios
    .post(
      `http://${process.env.REACT_APP_SERVER_IP}:9000/gethomedata.php`,
      null,
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      if (typeof res.data === "object") {
        const tmp: StatsData = res.data;
        return tmp;
      } else {
        return null;
      }
    });
};

export default GetHomeData;
