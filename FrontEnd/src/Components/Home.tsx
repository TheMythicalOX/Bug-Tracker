import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
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

export type TicketAmount = {
  low: number;
  medium: number;
  high: number;
  asap: number;
};

const Home = () => {
  const [ticketAmount, setTicketAmount] = useState<TicketAmount>({
    asap: 0,
    low: 0,
    medium: 0,
    high: 0,
  });
  const [projectTicketAmount, setProjectTicketAmount] = useState<
    TicketAmount[]
  >([]);
  let chartLow = "#960fc6";
  let chartMedium = "#aa10b1";
  let chartHigh = "#ba0b8c";
  let chartASAP = "#bb0961";

  const getHomeData = async () => {
    const tmp = await GetHomeData();
    console.log(projectTicketAmount);
    if (tmp) {
      let count = 0;
      let total = { asap: 0, low: 0, medium: 0, high: 0 };
      let projectTotal: string[] = [];
      tmp.map((ttmp) => {
        if (ttmp["severity"] === "ASAP") {
          total["asap"]++;
          projectTotal.push(ttmp["project_id"], "ASAP");
        }
        if (ttmp["severity"] === "Low") {
          total["low"]++;
          projectTotal.push(ttmp["project_id"], "ASAP");
        }
        if (ttmp["severity"] === "Medium") {
          total["medium"]++;
          projectTotal.push(ttmp["project_id"], "ASAP");
        }
        if (ttmp["severity"] === "High") {
          total["high"]++;
          projectTotal.push(ttmp["project_id"], "ASAP");
        }
        count++;
      });
      setTicketAmount(total);
      // setProjectTicketAmount(projectTotal);
      console.log(projectTotal);
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
        <h1>Active Tickets</h1>
        <div className="h-[90%] m-auto">
          <BarChart
            xAxis={[{ data: ["Total"] }]}
            series={[
              { data: [ticketAmount["low"]], label: "Low", color: chartLow },
              {
                data: [ticketAmount["medium"]],
                label: "Medium",
                color: chartMedium,
              },
              { data: [ticketAmount["high"]], label: "High", color: chartHigh },
              { data: [ticketAmount["asap"]], label: "ASAP", color: chartASAP },
            ]}
          />
        </div>
      </div>
      <div className={`bg-back`}>
        <h1>Project Stats</h1>
        <div className="h-[90%] m-auto">
          <BarChart
            xAxis={[{ data: ["Low", "Medium", "High", "ASAP"] }]}
            series={[
              { data: [1, 1, 1, 1], label: "Low" },
              { data: [2, 2, 2, 2], label: "Medium" },
              { data: [3, 3, 3, 3], label: "High" },
              { data: [4, 4, 4, 4], label: "ASAP" },
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
