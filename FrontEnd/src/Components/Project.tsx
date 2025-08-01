import { useEffect, useState } from "react";
import VarifySub from "../API/VarifySub";
import CreateTicket from "../API/CreateTicket";
import GetTickets from "../API/GetTickets";
import GetTicket from "../API/GetTicket";
import AdminPanel from "./AdminPanel";

export type Ticket = {
  title: string;
  desc: string;
  severity: "Low" | "Medium" | "High" | "ASAP" | null;
  project: string;
  role: string;
};

export type TicketDisplay = {
  title: string;
  desc: string;
  severity: "Low" | "Medium" | "High" | "ASAP";
  status: "New" | "In Progress" | "Functional" | "Complete";
};

const Project = (props: {
  name: string;
  setProject: Function;
  isAdmin: boolean;
}) => {
  const [createTicket, setCreateTicket] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<TicketDisplay | null>(
    null
  );
  const [ticketDisplays, setTicketDisplays] = useState<
    React.ReactNode[] | null
  >(null);
  const [ticket, setTicket] = useState<Ticket>({
    title: "",
    desc: "",
    severity: null,
    project: props.name,
    role: "",
  });

  const handleTicketSelect = async (name: string) => {
    const ticket = await GetTicket(name);
    setSelectedTicket(ticket);
  };

  const displayTickets = async () => {
    const projects = await GetTickets(props.name);
    if (projects[0].title === "no projects") {
      return;
    }
    if (projects) {
      let tmp: React.ReactNode[] = [];
      projects.map((element) => {
        tmp.push(
          <div
            className={`p-5 grid grid-cols-2 items-center`}
            key={element.title}
          >
            <h1 className="text-3xl">{element.title}</h1>
            <button
              onClick={() => {
                handleTicketSelect(element.title);
              }}
              className={`bg-gradient-to-l from-accent active:to-accent active:from-secondary to-secondary text-2xl p-3 m-auto w-52 rounded-2xl`}
            >
              {"View Ticket"}
            </button>
          </div>
        );
      });
      setTicketDisplays(tmp);
    }
  };

  useEffect(() => {
    displayTickets();
    setTicket({ ...ticket, severity: "Low" });
  }, []);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const id = e.currentTarget.id;
    if (error) setError(null);
    if (id === "title") setTicket({ ...ticket, title: e.currentTarget.value });
    if (id === "role") setTicket({ ...ticket, role: e.currentTarget.value });
    if (id === "desc") setTicket({ ...ticket, desc: e.currentTarget.value });
  };
  const handleChange2 = (e: React.FormEvent<HTMLSelectElement>) => {
    if (error) setError(null);
    let tmp = e.currentTarget.value;
    if (tmp === "Low") setTicket({ ...ticket, severity: tmp });
    if (tmp === "Medium") setTicket({ ...ticket, severity: tmp });
    if (tmp === "High") setTicket({ ...ticket, severity: tmp });
    if (tmp === "ASAP") setTicket({ ...ticket, severity: tmp });
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = VarifySub.varifyCreateTicket(ticket);

    if (err) setError(err);

    if (!err) {
      const isReg = await CreateTicket(ticket);
      if (typeof isReg === "string") {
        setError(isReg);
      } else if (typeof isReg === "boolean") {
        setCreateTicket(false);
        displayTickets();
      }
    }
  };

  return (
    <>
      {!createTicket && (
        <div className="flex w-[100%] h-[100vh] items-center">
          <div className="bg-back h-[90%] m-auto flex flex-wrap items-center rounded-3xl">
            <div className="grid grid-cols-2 w-[100%]  m-auto h-[20%]">
              <h1 className="col-span-2 text-2xl">{props.name}</h1>
              {error && <h1 className="col-span-2 text-2xl">{error}</h1>}
              <button
                className="bg-back text-2xl rounded-md p-2"
                onClick={() => {
                  props.setProject(null);
                }}
              >
                Go Back
              </button>
              <button
                onClick={() => {
                  setCreateTicket(true);
                }}
                className="bg-back text-2xl rounded-md p-2"
              >
                Make Ticket
              </button>
              {props.isAdmin && (
                <div className="col-span-2">
                  <button
                    className="bg-back text-2xl rounded-md p-2 "
                    onClick={(e) => {
                      e.preventDefault();
                      setShowAdminPanel(true);
                    }}
                  >
                    Admin Panel
                  </button>
                </div>
              )}
            </div>
            <div className="overflow-y-scroll w-[100%] h-[70%]">
              <div className={`grid grid-cols-1 `}>{ticketDisplays}</div>
            </div>
          </div>
          {showAdminPanel && (
            <div
              onClick={() => {
                setShowAdminPanel(false);
              }}
              className="h-screen w-screen absolute inset-0 grid justify-center items-center filter backdrop-blur-sm"
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="ml-40 bg-back shadow-2xl grid h-1/3 text-center items-center rounded-3xl"
              >
                <AdminPanel project={props.name} />
                <button
                  className="bg-back text-2xl p-3 px-16 rounded-3xl"
                  onClick={() => {
                    setShowAdminPanel(false);
                  }}
                >
                  Go Back
                </button>
              </div>
            </div>
          )}
          {selectedTicket && (
            <div
              onClick={() => {
                setSelectedTicket(null);
              }}
              className="h-screen w-screen absolute inset-0 grid justify-center items-center filter backdrop-blur-sm"
            >
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="m-auto bg-secondary bg-opacity-[0.75] w-[60vw] h-[60vh] rounded-3xl"
              >
                <div className="p-5 m-auto grid gap-5 grid-cols-3 grid-rows-12 h-full">
                  <div className="col-span-3 row-span-2">
                    <h1 className="inline">Title: </h1>
                    <h3 className="inline">{selectedTicket.title}</h3>
                  </div>
                  <div className="col-span-3 grid grid-cols-2 row-span-2">
                    <div>
                      <h1 className="inline">Status: </h1>
                      <h3 className="inline">{selectedTicket.status}</h3>
                    </div>
                    <div>
                      <h1 className="inline">Severity: </h1>
                      <h3 className="inline">{selectedTicket.severity}</h3>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <h1 className="inline">Description: </h1>
                    <h3 className="inline">{selectedTicket.desc}</h3>
                  </div>
                  <div className="col-span-3 row-start-12">
                    <button
                      className="bg-back opacity-[0.75] hover:opacity-[1] p-2 rounded-lg"
                      onClick={() => {
                        setSelectedTicket(null);
                      }}
                    >
                      Go Back
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      {createTicket && (
        <div className="grid grid-cols-2 gap-5 p-5 grid-rows-2 h-full">
          <div className="bg-back col-span-2">
            {error && <h1>{error}</h1>}
            {props.name}
            <button
              onClick={() => {
                setCreateTicket(false);
              }}
              className="bg-back rounded-md p-2"
            >
              Go Back
            </button>
            <form onSubmit={handleCreateProject}>
              <input
                id="title"
                value={ticket.title}
                onChange={handleChange}
                required
                type="text"
                placeholder="Ticket Title"
              />
              <input
                id="desc"
                value={ticket.desc}
                onChange={handleChange}
                required
                type="text"
                placeholder="Description"
              />
              <input
                id="role"
                value={ticket.role}
                onChange={handleChange}
                required
                type="text"
                placeholder="Role"
              />
              <select id="severity" onChange={handleChange2}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="ASAP">ASAP</option>
              </select>
              <button>Create</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Project;
