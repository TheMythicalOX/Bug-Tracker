const VarifySub = {
  varifyPassword: (pwd: string): string | null => {
    if (pwd.length < 5) {
      return "Passwords must be 5 or more characters";
    }

    if (pwd === pwd.toLowerCase()) {
      return "Password must have at least 1 uppercase character";
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
      return "Password must have at least 1 special character (! @ $ % ^ & * ( ) , . ?)";
    }

    return null;
  },

  varifyUsername: (name: string): string | null => {
    if (name.length < 5) {
      return "Username must be 5 or more characters";
    }

    if (name.indexOf("@") >= 0) {
      return "Username cannot contain an @ symbol";
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
      return "Enter a valid email";
    }

    return null;
  },

  varifyRegister: (
    name: string,
    email: string,
    pwd: string,
    pwd2: string
  ): string | null => {
    if (pwd !== pwd2) return "Passwords do not match";
    const varName = VarifySub.varifyUsername(name);
    if (varName !== "") return varName;
    const varEmail = VarifySub.varifyEmail(email);
    if (varName !== "") return varEmail;
    const varPwd = VarifySub.varifyEmail(pwd);
    if (varPwd !== "") return varPwd;
    return null;
  },
};

export default VarifySub;
