import axios from "axios";
import { UserReg } from "../Components/Register";

const RegisterUser = async (inputs: UserReg): Promise<boolean | string> => {
  inputs.email = inputs.email.toLowerCase();
  let error = await axios
    .get(
      `http://localhost:9000/register.php/?name=${inputs.name}&email=${inputs.email}`
    )
    .then((res) => {
      if (res.data === 1) {
        return "Username or Email is invalid";
      } else if (res.data === 2) {
        return "Username is already in use";
      } else if (res.data === 3) {
        return "Email is already in use";
      } else if (res.data !== "") {
        return "Something went wrong";
      }
    });

  if (error) return error;

  error = await axios
    .post("http://localhost:9000/register.php", inputs)
    .then((res) => {
      if (res.data === 1) {
        return "Username or Email is invalid";
      } else if (res.data === 4) {
        return "Password uses invalid characters";
      } else if (res.data === 6) {
        return "Registration was unsuccessful, Please try again";
      } else if (res.data !== "User Registered") {
        return res.data;
      }
    });
  if (error) {
    return error;
  } else {
    return true;
  }
};

export default RegisterUser;
