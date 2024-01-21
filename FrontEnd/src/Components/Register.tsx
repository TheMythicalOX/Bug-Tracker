import { useState } from "react";
import VarifySub from "../API/VarifySub";
import RegisterUser from "../API/RegisterUser";

export type UserReg = {
  name: string;
  email: string;
  pwd: string;
  pwd2: string;
};

const Register = (props: { setChangePage: Function }) => {
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<UserReg>({
    name: "",
    email: "",
    pwd: "",
    pwd2: "",
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const id = e.currentTarget.id;
    if (error) setError(null);
    if (id === "name") setUser({ ...user, name: e.currentTarget.value });
    if (id === "email") setUser({ ...user, email: e.currentTarget.value });
    if (id === "pwd") setUser({ ...user, pwd: e.currentTarget.value });
    if (id === "pwd2") setUser({ ...user, pwd2: e.currentTarget.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(
      VarifySub.varifyRegister(user.name, user.email, user.pwd, user.pwd2)
    );

    const isReg = await RegisterUser(user);
    if (typeof isReg === "string") {
      setError(isReg);
    } else {
      props.setChangePage("login");
    }
  };

  return (
    <>
      {error && <h1>{error}</h1>}
      <h1>Register</h1>
      <form id="form">
        <input
          autoComplete="off"
          required
          type="text"
          id="name"
          placeholder="Username"
          value={user.name}
          onChange={handleChange}
        />
        <input
          autoComplete="off"
          required
          type="text"
          id="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
        />
        <input
          required
          type="password"
          id="pwd"
          placeholder="Password"
          value={user.pwd}
          onChange={handleChange}
        />
        <input
          required
          type="password"
          id="pwd2"
          placeholder="Confirm Password"
          value={user.pwd2}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>Register</button>
      </form>
      <p>Already Have An Account?</p>
      <button
        onClick={(e: React.FormEvent) => {
          e.preventDefault();
          props.setChangePage("login");
        }}
      >
        Sign In!
      </button>
    </>
  );
};

export default Register;
