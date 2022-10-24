import react from "react";

function Login() {
    return (
        <div>
        <h1>User</h1>
        <input type="text"/>
        <label  for="usuario"></label>
        <h2>Password</h2> 
        <input type="text"/>
        <label  for="password"></label>         
        <h3>Login</h3>
        <button type="submit">Ingresar</button>
        </div>


    )

}

export default Login;