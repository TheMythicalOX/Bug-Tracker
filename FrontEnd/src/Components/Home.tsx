import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import GetHomeData from "../API/GetHomeData";

export type StatsData = [
  {
    id: string;
    title: string;
    projTitle: string;
    project_id: string;
    status: string;
    severity: string;
  }
];

export type TicketAmount = {
  completed: number;
  low: number;
  medium: number;
  high: number;
  asap: number;
};

const toHex = (num: number) => {
  if (num === 10) return "a";
  if (num === 11) return "b";
  if (num === 12) return "c";
  if (num === 13) return "d";
  if (num === 14) return "e";
  if (num === 15) return "f";
  return num;
};

const Home = () => {
  const urgentTicketDisplay = () => {
    return (
      <div className="h-[90%] m-auto overflow-clip">
        {urgentTickets.map((ticket) => {
          return (
            <div key={ticket.id}>
              <h2>{ticket.id}</h2>
              <h2>{ticket.title}</h2>
              <button>{"Go to -->"}</button>
            </div>
          );
        })}
      </div>
    );
  };

  const [ticketAmount, setTicketAmount] = useState<TicketAmount>({
    completed: 0,
    asap: 0,
    low: 0,
    medium: 0,
    high: 0,
  });
  const [projectTicketAmount, setProjectTicketAmount] = useState<{
    [key: string]: number[];
  }>({ completed: [0], low: [0], medium: [0], high: [0], asap: [0] });
  const [urgentTickets, setUrgentTickets] = useState<
    { id: string; title: string }[]
  >([{ id: "", title: "" }]);
  const [projectCompleted, setProjectCompleted] = useState<
    {
      id: number;
      value: number;
      label: string;
      color: string;
    }[]
  >([{ id: 0, value: 0, label: "", color: "" }]);
  const [projectNames, setProjectNames] = useState<string[]>([""]);
  let chartCompleted = "#460ff6";
  let chartLow = "#960fc6";
  let chartMedium = "#aa10b1";
  let chartHigh = "#ba0b8c";
  let chartASAP = "#bb0961";

  const getHomeData = async () => {
    const tmp = await GetHomeData();
    if (tmp) {
      let total = { completed: 0, asap: 0, low: 0, medium: 0, high: 0 };
      let projectTotal: { [key: string]: TicketAmount } = {};
      let projectNames: string[] = [];
      let urgentTick: { id: string; title: string }[] = [];
      let projectCompleted: { [key: string]: number } = {};
      tmp.map((ttmp) => {
        if (!projectTotal[ttmp["projTitle"]]) {
          projectTotal[ttmp["projTitle"]] = {
            completed: 0,
            asap: 0,
            low: 0,
            medium: 0,
            high: 0,
          };
          projectNames.push(ttmp["projTitle"]);
          projectCompleted[ttmp["projTitle"]] = 0;
        }
        if (ttmp["status"] !== "Completed") {
          if (ttmp["severity"] === "ASAP") {
            urgentTick.push({ id: ttmp["id"], title: ttmp["title"] });
            total["asap"]++;
            projectTotal[ttmp["projTitle"]]["asap"]++;
          }
          if (ttmp["severity"] === "Low") {
            total["low"]++;
            projectTotal[ttmp["projTitle"]]["low"]++;
          }
          if (ttmp["severity"] === "Medium") {
            total["medium"]++;
            projectTotal[ttmp["projTitle"]]["medium"]++;
          }
          if (ttmp["severity"] === "High") {
            total["high"]++;
            projectTotal[ttmp["projTitle"]]["high"]++;
          }
        } else {
          projectCompleted[ttmp["projTitle"]]++;
          projectTotal[ttmp["projTitle"]]["completed"]++;
        }
      });

      setUrgentTickets(urgentTick);
      setTicketAmount(total);
      setProjectNames(projectNames);
      let projectStatsData: { [key: string]: number[] } = {
        completed: [],
        low: [],
        medium: [],
        high: [],
        asap: [],
      };
      let completedProj: {
        id: number;
        value: number;
        label: string;
        color: string;
      }[] = [];
      let count = 0;
      projectNames.map((project) => {
        projectStatsData["completed"].push(projectTotal[project]["completed"]);
        projectStatsData["low"].push(projectTotal[project]["low"]);
        projectStatsData["medium"].push(projectTotal[project]["medium"]);
        projectStatsData["high"].push(projectTotal[project]["high"]);
        projectStatsData["asap"].push(projectTotal[project]["asap"]);
        completedProj.push({
          id: count,
          value: projectCompleted[project],
          label: project,
          color: `#${toHex(
            Math.floor(Math.random() * (12 - 5 + 1) + 5)
          )}${toHex(Math.floor(Math.random() * 10))}22${toHex(
            Math.floor(Math.random() * (15 - 10 + 1) + 10)
          )}${toHex(Math.floor(Math.random() * 10))}`,
        });
        count++;
      });
      setProjectCompleted(completedProj);
      setProjectTicketAmount(projectStatsData);
    }
  };

  useEffect(() => {
    getHomeData();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-2 p-2 grid-rows-2 h-full">
      <div className={`bg-back`}>
        <h1>Urgent Tickets</h1>
        {urgentTicketDisplay()}
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
            xAxis={[{ data: projectNames }]}
            series={[
              {
                data: projectTicketAmount["completed"],
                label: "Completed",
                color: chartCompleted,
              },
              {
                data: projectTicketAmount["low"],
                label: "Low",
                color: chartLow,
              },
              {
                data: projectTicketAmount["medium"],
                label: "Medium",
                color: chartMedium,
              },
              {
                data: projectTicketAmount["high"],
                label: "High",
                color: chartHigh,
              },
              {
                data: projectTicketAmount["asap"],
                label: "ASAP",
                color: chartASAP,
              },
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
                data: projectCompleted,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
