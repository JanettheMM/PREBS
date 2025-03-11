import React, { useState } from "react";

function Registro() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState({ name: "", password: "" });
  const [submitted, setSubmitted] = useState(false);

  //VALIDACIONES (NOMBRE Y CONTRASEÑA)
  const validate = (field, value) => {
    let error = "";
    if (field === "name" && value.trim() === "") {
      error = " El nombre no puede estar vacío";
    }
    if (field === "password" && value.length  < 7 ) {
      error = " La contraseña debe ser mayor a 6 caractere";
    }
    setError((prev) => ({ ...prev, [field]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate("name", form.name);
    validate("password", form.password);
    
    if (!error.name && !error.password) {
      setSubmitted(true);
    }
  };

  return (
    <div>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div>
            <h1>FORMULARIO</h1>
            <label>NOMBRE: </label>
            <input type="text" name="name" value={form.name} onChange={handleChange} />
            <span>{error.name}</span>
          </div>

          <div>
            <label>EMAIL: </label>
            <input type="email" name="email" value={form.email} onChange={handleChange} />
          </div>
          <div>
            <label>CONTRASEÑA: </label>
            <input type="password" name="password" value={form.password} onChange={handleChange} />
            <span>{error.password}</span>
          </div>
          <br />
          <button type="submit">REGISTRAR</button>
        </form>
      ) : (
        <DatosUsuario form={form} />
      )}
    </div>
  );
}

//DATOS DEL FORMULARIO EN OTRO COMPONENTE 
function DatosUsuario({ form }) {
  return (
    <div>
      <h2>DATOS REGISTRADOS</h2>
      <p><strong>Nombre: </strong> {form.name}</p>
      <p><strong>Email: </strong>{form.email}</p>
      <p><strong>Contraseña: {form.password}</strong></p>
      <p><button onClick={form}>HACER OTRO REGISTRO</button></p>
    </div>
  );
}

export default Registro;
