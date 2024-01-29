import { useEffect, useState } from "react";
import VarifySub from "../API/VarifySub";
import CreateTicket from "../API/CreateTicket";
import GetTickets from "../API/GetTickets";

export type Ticket = {
  title: string;
  desc: string;
  severity: number | null;
  project: string;
  role: string;
};

export type ticketDisplay = {
  title: string;
};

const Project = (props: { name: string; setProject: Function }) => {
  const [createTicket, setCreateTicket] = useState(false);
  const [error, setError] = useState<string | null>(null);
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

  const handleTicketSelect = (name: string) => {};

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
    if (tmp === "1") setTicket({ ...ticket, severity: 1 });
    if (tmp === "2") setTicket({ ...ticket, severity: 2 });
    if (tmp === "3") setTicket({ ...ticket, severity: 3 });
    if (tmp === "4") setTicket({ ...ticket, severity: 4 });
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
            <div>{ticketDisplays}</div>
          </div>
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
                <option value={1}>Low</option>
                <option value={2}>Medium</option>
                <option value={3}>High</option>
                <option value={4}>Immediate</option>
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
