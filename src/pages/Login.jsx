function Login() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Login</h1>
      <form>
        <input type="email" placeholder="Email" style={{ display: "block", margin: "10px auto" }} />
        <input type="password" placeholder="Password" style={{ display: "block", margin: "10px auto" }} />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Login;
