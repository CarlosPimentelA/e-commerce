import "../styles/Register.css";
// import '../styles/Login.css';
import Header from "./Header";
import Input from "./Input";
import imgUsuario from "../assets/imagen-usuario.png";
import imgPassword from "../assets/imagen-candado.png";
import imgCorreo from "../assets/imagen-correoElectronico.png";
import { useState } from "react";
function Register() {
  const [registerData, setRegisterData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    console.log(registerData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
      if (response.ok) {
        console.log("Success");
        window.location.href = "/login";
      }
    } catch (error) {
      console.log({ error: error.message });
    }

  };
  return (
    <form className="main-register-container" onSubmit={handleSubmit}>
      <div className="div-register-container">
        <Header value="CREATE ACCOUNT" />
        <div className="input-container">
          <Input
            id="1"
            name="firstname"
            placeholder="First Name"
            img={imgUsuario}
            type="text"
            alt="img usuario"
            handleChange={handleChange}
            value={registerData.firstname}
          />
          <Input
            id="2"
            name="lastname"
            placeholder="Last Name"
            img={imgUsuario}
            type="text"
            alt="img usuario"
            handleChange={handleChange}
            value={registerData.lastname}
          />
          <Input
            id="3"
            name="email"
            placeholder="Email ID"
            img={imgCorreo}
            type="email"
            alt="img Correo Electronico"
            handleChange={handleChange}
            value={registerData.email}
          />
          <Input
            id="4"
            name="password"
            placeholder="Password"
            img={imgPassword}
            type="password"
            alt="img Pasword"
            handleChange={handleChange}
            value={registerData.password}
          />
        </div>
        <div className="div-register-boton">
          <button>REGISTER</button>
        </div>
      </div>
    </form>
  );
}

export default Register;
