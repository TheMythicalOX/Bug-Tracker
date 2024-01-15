import { useState } from "react";
import { Navigate, Link } from "react-router-dom";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (isLoggedIn) {
    return <Navigate to="/Home" />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };
  return (
    <div className="w-screen h-screen grid grid-cols-1 items-center justify-items-center">
      <form
        action="submit"
        onSubmit={handleSubmit}
        className=" bg-stone-900 w-3/6 h-4/6 rounded-3xl items-center justify-items-center"
      >
        <h1 className="">Login</h1>
        <input
          className="rounded-3xl text-center"
          required
          type="text"
          name="username"
          placeholder="Username"
          autoComplete="off"
        />
        <input
          className="rounded-3xl text-center"
          required
          type="password"
          name="password"
          placeholder="Password"
        />
        <button className="" type="submit">
          Login
        </button>
        <p>Need An Account?</p>
        <Link to="/Register">Sign Up!</Link>
      </form>
    </div>
  );
};

export default Login;
