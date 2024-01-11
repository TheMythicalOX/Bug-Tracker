const Login = () => {
  return (
    <div className="Login">
      <h1>Login</h1>
      <form action="submit">
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
