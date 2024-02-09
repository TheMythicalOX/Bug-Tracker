import { useEffect, useState } from "react";
import VarifySub from "../API/VarifySub";
import AdminLogin from "../API/AdminLogin";
import GetJoinRequests from "../API/GetJoinRequests";
import JoinResponse from "../API/JoinResponse";

export type JoinRequestDisplay = {
  username: string;
};

const AdminPanel = (props: { project: string }) => {
  const [error, setError] = useState<string | null>(null);
  const [joinDisplays, setJoinDisplays] = useState<React.ReactNode[] | null>(
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

  useEffect(() => {
    if (loggedIn) {
      getRequests();
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
          {joinDisplays}
        </div>
      )}
    </>
  );
};

export default AdminPanel;
