import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect } from "react";
import GetHomeData from "../API/GetHomeData";
// import { useUserContext } from "./Context";

export type StatsData = [
  {
    id: string;
    title: string;
    project_id: string;
    status: string;
    severity: string;
  }
];
const Home = () => {
  // const user = useUserContext();

  const getHomeData = async () => {
    const tmp = await GetHomeData();
    if (tmp) {
      // let count = 0;
      // let tmphold: StatsData = [];
      // tmp.map((ttmp) => {
      //   tmphold[count]["id"] = ttmp[count]["id"];
      //   count++;
      // });
    }
  };

  useEffect(() => {
    getHomeData();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-2 p-2 grid-rows-2 h-full">
      <div className={`bg-back`}>
        <h1>Urgent Tickets</h1>
      </div>
      <div className={`bg-back`}>
        <h1>Total Tickets</h1>
        <div className="h-[90%] m-auto">
          <BarChart
            xAxis={[{ data: ["Total"] }]}
            series={[{ data: [4] }, { data: [1] }, { data: [2] }]}
          />
        </div>
      </div>
      <div className={`bg-back`}>
        <h1>Project Stats</h1>
        <div className="h-[90%] m-auto">
          <BarChart
            xAxis={[{ data: ["Low", "Medium", "High", "ASAP"] }]}
            series={[
              { data: [1, 1, 1, 1], label: "Project 1" },
              { data: [2, 2, 2, 2], label: "Project 2" },
              { data: [3, 3, 3, 3], label: "Project 3" },
              { data: [4, 4, 4, 4], label: "Project 4" },
            ]}
          />
        </div>
      </div>
      <div className={`bg-back`}>
        <h1>Completed Tickets</h1>
        <div className="h-[90%] m-auto">
          <PieChart
            series={[
              {
                data: [
                  { id: 0, value: 10, label: "Project 1" },
                  { id: 1, value: 15, label: "Project 2" },
                  { id: 2, value: 20, label: "Project 3" },
                ],
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
