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

    if (!error) {
      const isReg = await RegisterUser(user);
      if (typeof isReg === "string") {
        setError(isReg);
      } else if (typeof isReg === "boolean") {
        props.setChangePage("login");
      }
    }
  };

  return (
    <>
      <div className="w-screen h-screen grid grid-cols-1 items-center justify-items-center">
        <form
          className={`bg-stone-300 w-3/6 h-4/6 rounded-3xl items-center justify-items-center grid`}
          id="form"
        >
          {error && <h1>{error}</h1>}
          <h1 className="text-3xl">Register</h1>
          <div className={`grid`}>
            <label className={`pl-5 text-2xl`} htmlFor="name">
              Username
            </label>
            <input
              className="rounded-3xl text-left p-3 px-6"
              autoComplete="off"
              required
              type="text"
              id="name"
              placeholder="Example Username"
              value={user.name}
              onChange={handleChange}
            />
          </div>
          <div className={`grid`}>
            <label className={`pl-5 text-2xl`} htmlFor="name">
              Email
            </label>
            <input
              className="rounded-3xl text-left p-3 px-6"
              autoComplete="off"
              required
              type="text"
              id="email"
              placeholder="example@example.com"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className={`grid`}>
            <label className={`pl-5 text-2xl`} htmlFor="name">
              Password
            </label>
            <input
              className="rounded-3xl text-left p-3 px-6"
              required
              type="password"
              id="pwd"
              placeholder="Password"
              value={user.pwd}
              onChange={handleChange}
            />
          </div>
          <div className={`grid`}>
            <label className={`pl-5 text-2xl`} htmlFor="name">
              Varify Password
            </label>
            <input
              className="rounded-3xl text-left p-3 px-6"
              required
              type="password"
              id="pwd2"
              placeholder="Confirm Password"
              value={user.pwd2}
              onChange={handleChange}
            />
          </div>
          <button
            className={`bg-blue-500 text-2xl p-3 px-16 rounded-3xl`}
            onClick={handleSubmit}
          >
            Register
          </button>
          <div>
            <p>Already Have An Account?</p>
            <button
              onClick={(e: React.FormEvent) => {
                e.preventDefault();
                props.setChangePage("login");
              }}
            >
              Sign In!
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
