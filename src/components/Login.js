import react from "react";
import { navigate, useNavigate } from "react-router-dom";
import Users from "./users.json";

function Login() {
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    const user = Users.users.find(
      (user) =>
        user.email === e.target.email.value &&
        user.password === e.target.password.value
    );
    console.log(user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      if (user.role === "admin") {
        navigate("/admin/products");
      } else {
        navigate("/");
      }
    } else {
      alert("Invalid credentials");
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="row justify-content-center py-4">
      <div className="col-md-3">
        <form onSubmit={login}>
        <label forhtml="usuario">User</label>
          <input className="form-control" name="email" type="email" />
          <label forhtml="password">Password</label>
          <input className="form-control" name="password" type="password" />
          <button className="btn btn-primary mt-2" type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
