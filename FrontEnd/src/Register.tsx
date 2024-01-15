import { useState } from "react";
import { Navigate } from "react-router";

const Register = () => {
  const [isReg, setIsReg] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // register user
    setIsReg(true);
  };

  return (
    <div className="Register">
      {isReg && <Navigate to="/" />}
      <h1>Register</h1>
      <form action="submit" onSubmit={handleSubmit}>
        <input required type="text" name="username" placeholder="Username" />
        <input required type="text" name="email" placeholder="Email" />
        <input
          required
          type="password"
          name="password"
          placeholder="Password"
        />
        <input
          required
          type="password"
          name="re-password"
          placeholder="Confirm Password"
        />
        <button>Register</button>
      </form>
    </div>
  );
};

export default Register;
