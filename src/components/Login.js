import react from "react";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const navigate = useNavigate();
  const { setUser } = props;

  /**
   * Verifica que el usuario y la contraseña sean correctos.
   * @param {Object} e
   */

  const login = (e) => {
    e.preventDefault();
    const user = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    fetch("https://backend-shop2.herokuapp.com/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          alert(data.message);
        } else {
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
          if (data.role === "Admin") {
            navigate("/admin/products");
          } else {
            navigate("/");
          }
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="row justify-content-center py-4">
      <div className="col-md-3">
        <form onSubmit={login}>
        <label htmlFor="email">User</label>
          <input className="form-control" name="email" type="email" />
          <label htmlFor="password">Password</label>
          <input className="form-control" name="password" type="password" />
          <button className="btn btn-primary mt-2" type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
