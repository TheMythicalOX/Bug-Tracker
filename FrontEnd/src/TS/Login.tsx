import { useState } from "react";
import { Navigate } from "react-router-dom";

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
    <div className="Login">
      <h1>Login</h1>
      <form action="submit" onSubmit={handleSubmit}>
        <input required type="text" name="username" placeholder="Username" />
        <input
          required
          type="password"
          name="password"
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
