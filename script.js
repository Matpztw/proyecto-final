function actualizarPerfil() {
    const inputs = document.querySelectorAll("input");

    const usuarioActualizado = {
        nombre: inputs[0].value,
        correo: inputs[1].value,
        edad: inputs[2].value,
        genero: document.querySelector("select").value,
        password: inputs[4].value
    };

    localStorage.setItem("usuario", JSON.stringify(usuarioActualizado));
    alert("Datos actualizados");
}

