import { useState } from "react";
import tryLogin from "../API/Login";
import { useUserContext } from "./Context";

const Login = (props: { setChangePage: Function }) => {
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const user = useUserContext();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const id = e.currentTarget.id;
    if (error) setError(null);

    if (id === "name") setName(e.currentTarget.value);

    if (id === "pwd") setPwd(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(await tryLogin.Login(name, pwd, user));
  };
  return (
    <>
      <div className="w-screen h-screen text-pritext grid grid-cols-1 items-center justify-items-center">
        <form
          className={`bg-black bg-opacity-[0.1] shadow-lg w-3/6 h-4/6 rounded-3xl items-center justify-items-center grid`}
        >
          {" "}
          {error && <h1> {error}</h1>}
          <h1 className="text-3xl">Login</h1>
          <div className={`grid`}>
            <label className={`pl-5 text-2xl`} htmlFor="name">
              Username or Email
            </label>
            <input
              className="rounded-3xl shadow-md bg-secondary text-left p-3 px-6"
              required
              type="text"
              id="name"
              placeholder="Username or Email"
              autoComplete="off"
              value={name}
              onChange={handleChange}
            />
          </div>
          <div className={`grid`}>
            <label className={`pl-5 text-2xl`} htmlFor="pwd">
              Password
            </label>
            <input
              className="rounded-3xl shadow-md bg-secondary text-left p-3 px-6"
              required
              type="password"
              id="pwd"
              placeholder="Password"
              value={pwd}
              onChange={handleChange}
            />
          </div>
          <button
            className={`bg-gradient-to-b from-accent active:to-accent active:from-secondary to-secondary text-2xl shadow-md p-3 px-16 rounded-3xl`}
            onClick={handleSubmit}
          >
            Login
          </button>
          <div>
            <p>Need An Account?</p>
            <button
              onClick={(e: React.FormEvent) => {
                e.preventDefault();
                props.setChangePage("register");
              }}
            >
              Sign Up!
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
