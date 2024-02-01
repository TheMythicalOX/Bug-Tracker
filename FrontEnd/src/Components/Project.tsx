import { useEffect, useState } from "react";
import VarifySub from "../API/VarifySub";
import CreateTicket from "../API/CreateTicket";
import GetTickets from "../API/GetTickets";
import GetTicket from "../API/GetTicket";

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
            onClick={() => {
              handleTicketSelect(element.title);
            }}
            key={element.title}
          >
            {element.title}
          </div>
        );
      });
      setTicketDisplays(tmp);
    }
  };

  useEffect(() => {
    displayTickets();
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
        <div className="grid grid-cols-2 gap-5 p-5 grid-rows-2 h-full">
          <div className="bg-stone-900 col-span-2">
            {error && <h1>{error}</h1>}
            {props.name}
            <button
              className="bg-black rounded-md p-2"
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
              className="bg-black rounded-md p-2"
            >
              Make Ticket
            </button>
            {props.isAdmin && (
              <div>
                <button>Admin Panel</button>
              </div>
            )}
            <div>{ticketDisplays}</div>
          </div>
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
                className="ml-40 bg-black w-96 h-1/3  rounded-3xl"
              >
                <h1>{selectedTicket.title}</h1>
                <h1>{selectedTicket.desc}</h1>
                <h1>{selectedTicket.status}</h1>
                <h1>{selectedTicket.severity}</h1>
                <button
                  onClick={() => {
                    setSelectedTicket(null);
                  }}
                >
                  Go Back
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {createTicket && (
        <div className="grid grid-cols-2 gap-5 p-5 grid-rows-2 h-full">
          <div className="bg-stone-900 col-span-2">
            {error && <h1>{error}</h1>}
            {props.name}
            <button
              onClick={() => {
                setCreateTicket(false);
              }}
              className="bg-black rounded-md p-2"
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
