const FormSub = {
  varifyPassword: (pwd: string): string => {
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

    return "good";
  },

  varifyUsername: (name: string): string => {
    if (name.length < 5) {
      return "Username must be 5 or more characters";
    }

    if (name.indexOf("@") >= 0) {
      return "Username cannot contain an @ symbol";
    }

    return "good";
  },

  varifyEmail: (email: string): string => {
    if (
      email.indexOf("@") < 0 ||
      email.indexOf(".") < 0 ||
      email.length < 3 ||
      email.length > 255
    ) {
      return "Enter a valid email";
    }

    return "good";
  },
};

export default FormSub;
