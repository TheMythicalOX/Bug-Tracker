import { Ticket } from "../Components/Project";

const VarifySub = {
  varifyPassword: (pwd: string): string | null => {
    if (pwd.length < 5) {
      return "Passwords must be 5 or more characters.";
    }

    if (pwd === pwd.toLowerCase()) {
      return "Password must have at least 1 uppercase character.";
    }

    if (
      pwd.indexOf("!") < 0 &&
      pwd.indexOf("@") < 0 &&
      pwd.indexOf("$") < 0 &&
      pwd.indexOf("%") < 0 &&
      pwd.indexOf("^") < 0 &&
      pwd.indexOf("&") < 0 &&
      pwd.indexOf("*") < 0 &&
      pwd.indexOf("(") < 0 &&
      pwd.indexOf(")") < 0 &&
      pwd.indexOf(".") < 0 &&
      pwd.indexOf(",") < 0 &&
      pwd.indexOf("?") < 0
    ) {
      return "Password must have at least 1 special character (! @ $ % ^ & * ( ) , . ?).";
    }

    return null;
  },

  varifyUsername: (name: string): string | null => {
    if (name.length < 5) {
      return "Username must be 5 or more characters.";
    }

    if (name.indexOf("@") >= 0) {
      return "Username cannot contain an @ symbol.";
    }

    return null;
  },

  varifyEmail: (email: string): string | null => {
    if (
      email.indexOf("@") < 0 ||
      email.indexOf(".") < 0 ||
      email.length < 3 ||
      email.length > 255
    ) {
      return "Enter a valid email.";
    }

    return null;
  },

  varifyRegister: (
    name: string,
    email: string,
    pwd: string,
    pwd2: string
  ): string | null => {
    if (pwd !== pwd2) return "Passwords do not match.";
    const varName = VarifySub.varifyUsername(name);
    if (varName !== "") return varName;
    const varEmail = VarifySub.varifyEmail(email);
    if (varName !== "") return varEmail;
    const varPwd = VarifySub.varifyPassword(pwd);
    if (varPwd !== "") return varPwd;
    return null;
  },

  varifyCreateProject: (
    name: string,
    desc: string,
    pwd: string,
    pwd2: string
  ): string | null => {
    if (pwd !== pwd2) return "Passwords do not match";
    const varPwd = VarifySub.varifyPassword(pwd);
    if (varPwd !== "") return varPwd;
    if (name.length < 5) return "Project Name Must Be 5 or More Characters.";
    if (desc.length > 500)
      return "Description Must Be Less Than 500 Characters.";
    if (desc.length < 5)
      return "Project Description Must Be 5 or More Characters.";
    return null;
  },
  varifyCreateTicket: (ticket: Ticket): string | null => {
    if (ticket.title.length < 5)
      return "Ticket Title Must Be 5 or More Characters.";
    if (ticket.title.length > 45)
      return "Ticket Title Must Be Less Than 45 Characters.";
    if (ticket.desc.length > 500)
      return "Description Must Be Less Than 500 Characters.";
    if (ticket.desc.length < 5)
      return "Ticket Description Must Be 5 or More Characters.";
    if (ticket.role.length < 3) return "Role Must Be 3 or More Characters.";
    if (ticket.role.length > 45) return "Role Must Be Less Than 45 Characters.";
    if (ticket.severity === null) return "Severity Must Be Set.";
    return null;
  },
};

export default VarifySub;
