import axios from "axios";
import { useRef, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useUserContext } from "./Context";
// import preLogged from "./Functions/preLogged";

const Login = () => {
  const refError = useRef(true);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const user = useUserContext();
  // useEffect(() => {
  //   if (!user.isLoggedIn) {
  //     preLogged.preLoggedIn(user);
  //   }
  // }, [user]);

  if (user.isLoggedIn) {
    return <Navigate to="/home" />;
  }

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const id = e.currentTarget.id;
    if (error) setError(null);
    if (id === "name") setName(e.currentTarget.value);
    if (id === "pwd") setPwd(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    refError.current = true;
    if (name === "" || pwd === "") {
      setError("Please input all fields");
      return;
    }
    if (name.indexOf("@") >= 0) name.toLowerCase();
    await axios
      .post(
        "http://localhost:9000/login.php",
        {
          name: name,
          pwd: pwd,
          cookie: false,
          withCredentials: true,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data === 1) {
          setError("Username or Password is invalid");
          refError.current = false;
        }
        if (res.data === 2) {
          setError("Username and Password do not match");
          refError.current = false;
        }
        if (res.data !== "Logged in") {
          setError(res.data);
          refError.current = false;
        }
      });
    user.setUser({ name: name });
    user.setIsLoggedIn(refError.current);
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
          <Link to="/register">Sign Up!</Link>
        </form>
      </div>
    </>
  );
};

export default Login;
