const Register = () => {
  return (
    <div className="login">
      <h1>Login</h1>
      <form action="submit">
        <input type="text" name="username" placeholder="Username" />
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <input
          type="password"
          name="re-password"
          placeholder="Confirm Password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
