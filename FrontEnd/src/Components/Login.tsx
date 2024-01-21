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
      <div className="w-screen h-screen grid grid-cols-1 items-center justify-items-center">
        <form className=" bg-stone-900 w-3/6 h-4/6 rounded-3xl items-center justify-items-center">
          {error && <h1>{error}</h1>}
          <h1 className="">Login</h1>
          <input
            className="rounded-3xl text-center"
            required
            type="text"
            id="name"
            placeholder="Username or Email"
            autoComplete="off"
            value={name}
            onChange={handleChange}
          />
          <input
            className="rounded-3xl text-center"
            required
            type="password"
            id="pwd"
            placeholder="Password"
            value={pwd}
            onChange={handleChange}
          />
          <button onClick={handleSubmit}>Login</button>
          <p>Need An Account?</p>
          <button
            onClick={(e: React.FormEvent) => {
              e.preventDefault();
              props.setChangePage("register");
            }}
          >
            Sign Up!
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
