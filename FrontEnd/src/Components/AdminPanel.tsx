import { useEffect, useState } from "react";
import VarifySub from "../API/VarifySub";
import AdminLogin from "../API/AdminLogin";
import GetJoinRequests from "../API/GetJoinRequests";
import JoinResponse from "../API/JoinResponse";
import GetUsers from "../API/GetUsers";
import RemoveProjectUser from "../API/RemoveProjectUser";

export type JoinRequestDisplay = {
  username: string;
};
export type UserDisplay = {
  username: string;
  email: string;
};

const AdminPanel = (props: { project: string }) => {
  const [page, setPage] = useState<"users" | "join">("users");
  const [error, setError] = useState<string | null>(null);
  const [joinDisplays, setJoinDisplays] = useState<React.ReactNode[] | null>(
    null
  );
  const [usersDisplays, setUsersDisplays] = useState<React.ReactNode[] | null>(
    null
  );
  const [loggedIn, setLoggedIn] = useState(false);
  const [pwd, setPwd] = useState("");
  const handleLogin = async () => {
    setError(VarifySub.varifyPassword(pwd));
    let tmp = await AdminLogin(props.project, pwd);
    if (tmp === "") {
      setLoggedIn(true);
    } else setError(tmp);
  };

  const handleResponse = async (res: string, name: string) => {
    const tmp = await JoinResponse(res, name, props.project);
    if (tmp) {
      getRequests();
    }
  };

  const handleRemove = async (email: string) => {
    const tmp = await RemoveProjectUser(email, props.project);
    if (tmp) {
    getUsers();
    }
  }

  const getRequests = async () => {
    let requests = await GetJoinRequests(props.project);
    if (requests[0].username === "no projects") {
      setJoinDisplays(null);
      return;
    }
    if (requests) {
      let tmp: React.ReactNode[] = [];
      requests.map((element) => {
        tmp.push(
          <div className="rounded-md bg-slate-950" key={element.username}>
            {element.username}
            <button
              onClick={() => {
                handleResponse("yes", element.username);
              }}
            >
              Accept
            </button>
            <button
              onClick={() => {
                handleResponse("no", element.username);
              }}
            >
              Decline
            </button>
          </div>
        );
      });
      setJoinDisplays(tmp);
    }
  };
  const getUsers = async () => {
    let users = await GetUsers(props.project);
    if (users[0].username === "no projects") {
      setUsersDisplays(null);
      return;
    }
    if (users) {
      let tmp: React.ReactNode[] = [];
      users.map((element) => {
        tmp.push(
          <div className="rounded-md bg-slate-400" key={element.email}>
            {element.username}
            {element.email}
            <button
              onClick={(e) => {
                e.preventDefault();
                handleRemove(element.email);
                getUsers();
              }}
            >
              Remove
            </button>
          </div>
        );
      });
      setUsersDisplays(tmp);
    }
  };

  useEffect(() => {
    if (loggedIn) {
      getUsers();
    }
  }, [loggedIn]);

  return (
    <>
      {!loggedIn && (
        <div className="grid">
          <h2 className="text-3xl p-10">Enter Admin Password</h2>
          {error && <h1>{error}</h1>}
          <input
            onChange={(e) => {
              setError(null);
              setPwd(e.target.value);
            }}
            value={pwd}
            className="rounded-3xl text-left p-3 px-6"
            required
            type="password"
            placeholder="Password"
          />
          <button
            className="bg-blue-500 text-2xl p-3 px-16 rounded-3xl"
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            Loggin
          </button>
        </div>
      )}
      {loggedIn && (
        <div>
          <h1>Logged In As Admin</h1>
          <button
            onClick={(e) => {
              e.preventDefault();
              setPage("join");
              getRequests();
            }}
          >
            Requests
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setPage("users");
              getUsers();
            }}
          >
            Users
          </button>
          {page === "join" && joinDisplays}
          {page === "users" && usersDisplays}
        </div>
      )}
    </>
  );
};

export default AdminPanel;
