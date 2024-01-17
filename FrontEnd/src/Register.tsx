import axios from "axios";
import { useRef, useState } from "react";
import { Navigate } from "react-router";

const Register = () => {
  type UserReg = {
    name: string;
    email: string;
    pwd: string;
    pwd2: string;
  };
  const refError = useRef(true);
  const [isReg, setIsReg] = useState(false);
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
    if (user.pwd !== user.pwd2) {
      setError("Passwords do not match");
      return;
    }

    if (user.name.length <= 4) {
      setError("Username must be 5 or more characters");
      return;
    }

    // TODO more verification
    if (
      user.email.indexOf("@") < -1 ||
      user.email.indexOf(".") < user.email.indexOf("@") ||
      user.email.length < 3 ||
      user.email.length > 255
    ) {
      setError("Enter a valid email");
      return;
    }

    if (await registerUser(user)) setIsReg(true);
  };

  const registerUser = async (inputs: UserReg): Promise<boolean> => {
    refError.current = true;
    inputs.email = inputs.email.toLocaleLowerCase();
    await axios
      .get(
        `http://localhost:9000/register.php/?name=${inputs.name}&email=${inputs.email}`
      )
      .then((res) => {
        if (res.data === 1) {
          setError("Username or Email is invalid");
          refError.current = false;
        }
        if (res.data === 2) {
          setError("Username is already in use");
          refError.current = false;
        }
        if (res.data === 3) {
          setError("Email is already in use");
          refError.current = false;
        }
        if (res.data === "") {
          setError("Something went wrong");
          refError.current = false;
        }
      });

    if (!refError.current) return false;

    await axios
      .post("http://localhost:9000/register.php", inputs)
      .then((res) => {
        if (res.data === 1) {
          setError("Username or Email is invalid");
          refError.current = false;
        }
        if (res.data === 1) {
          setError("Password uses invalid characters");
          refError.current = false;
        }
        if (res.data === 5) {
          setError("There was an issue registering, Please try again");
          refError.current = false;
        }
        if (res.data === 6) {
          setError("Registration was unsuccessful, Please try again");
          refError.current = false;
        }
      });
    return refError.current;
  };

  return (
    <div className="Register">
      {isReg && <Navigate to="/" />}
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
    </div>
  );
};

export default Register;
