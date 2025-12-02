//usuarios

function registrarUsuario() {
    const usuario = {
        nombre: document.querySelector('input[placeholder="Ingresa tu nombre"]').value,
        edad: document.querySelector('input[type="number"]').value,
        genero: document.querySelector('select').value,
        correo: document.querySelector('input[type="email"]').value,
        password: document.querySelector('input[type="password"]').value
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));
    alert("Usuario registrado correctamente");
    window.location.href = "perfil.html";
}

function actualizarUsuario() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
        alert("No hay un usuario registrado.");
        return;
    }

    usuario.nombre = document.querySelector('input[placeholder="Ingresa tu nombre"]').value;
    usuario.edad = document.querySelector('input[type="number"]').value;
    usuario.genero = document.querySelector('select').value;
    usuario.correo = document.querySelector('input[type="email"]').value;

    localStorage.setItem("usuario", JSON.stringify(usuario));
    alert("Datos actualizados correctamente");
}



//catalogo

// Relojes por defecto
const relojesDefault = [
    {
        modelo: "Modelo Clásico",
        descripcion: "Diseño tradicional con correa de cuero premium.",
        imagen: "images/elegante.jpg"
    },
    {
        modelo: "Sport Pro",
        descripcion: "Resistente al agua e ideal para actividad física.",
        imagen: "images/deportivo.jpg"
    },
    {
        modelo: "Edición Premium",
        descripcion: "Materiales de alta calidad y mecanismo suizo.",
        imagen: "images/premium.jpg"
    }
];

// Cargar el catálogo
function cargarCatalogo() {
    let catalogo = JSON.parse(localStorage.getItem("catalogo"));

    if (!catalogo) {
        localStorage.setItem("catalogo", JSON.stringify(relojesDefault));
        catalogo = relojesDefault;
    }

    const contenedor = document.getElementById("contenedor-relojes");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    catalogo.forEach(reloj => {
        const card = `
        <div class="col-12 col-sm-6 col-md-4">
            <div class="card shadow h-100">
                <img src="${reloj.imagen}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${reloj.modelo}</h5>
                    <p class="card-text">${reloj.descripcion}</p>

                    <button class="btn btn-dark w-100 btn-vermas" data-modelo="${reloj.modelo}">
                        Ver más
                    </button>

                    <button class="btn btn-success w-100 mt-2 btn-carrito" data-modelo="${reloj.modelo}">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>`;

        contenedor.innerHTML += card;
    });

    conectarBotonesVerMas();
    conectarBotonesCarrito();
}



//boton ver mas

function conectarBotonesVerMas() {
    const botones = document.querySelectorAll(".btn-vermas");

    botones.forEach((btn) => {
        btn.addEventListener("click", () => {
            const modelo = btn.dataset.modelo;
            alert("Mostrando detalles del modelo: " + modelo);
        });
    });
}


// carrito de compras


function agregarAlCarrito(modelo) {
    let catalogo = JSON.parse(localStorage.getItem("catalogo")) || [];
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const reloj = catalogo.find(r => r.modelo === modelo);

    if (!reloj) {
        alert("Error: el reloj no existe en el catálogo.");
        return;
    }

    const itemCarrito = carrito.find(item => item.modelo === modelo);

    if (itemCarrito) {
        itemCarrito.cantidad += 1;
    } else {
        carrito.push({
            modelo: reloj.modelo,
            imagen: reloj.imagen,
            descripcion: reloj.descripcion,
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto agregado al carrito");
}

function conectarBotonesCarrito() {
    const botones = document.querySelectorAll(".btn-carrito");

    botones.forEach(btn => {
        btn.addEventListener("click", () => {
            agregarAlCarrito(btn.dataset.modelo);
        });
    });
}



//  CARGAR CATALOGO 

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("contenedor-relojes")) {
        cargarCatalogo();
    }
});

//cargar y mostrar

function cargarCarrito() {
    const contenedor = document.getElementById("lista-carrito");
    const vacio = document.getElementById("carrito-vacio");
    const totalTxt = document.getElementById("total-carrito");

    if (!contenedor) return;

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        vacio.style.display = "block";
        totalTxt.textContent = "$0";
        return;
    }

    vacio.style.display = "none";

    let total = 0;

    carrito.forEach((item, index) => {
        total += item.cantidad * 1999; // precio base 

        contenedor.innerHTML += `
            <div class="row mb-4 align-items-center">
                <div class="col-3">
                    <img src="${item.imagen}" class="img-fluid rounded shadow">
                </div>

                <div class="col-6">
                    <h5>${item.modelo}</h5>
                    <p class="text-muted">${item.descripcion}</p>
                    <p class="fw-bold">Cantidad: ${item.cantidad}</p>
                </div>

                <div class="col-3 text-end">
                    <button class="btn btn-danger btn-sm" onclick="eliminarDelCarrito(${index})">
                        Eliminar
                    </button>
                </div>
            </div>
            <hr>
        `;
    });

    totalTxt.textContent = "$" + total;
}


//eliminar producto

function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.splice(index, 1);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    cargarCarrito();
}


//vaciar carrito

document.addEventListener("DOMContentLoaded", () => {
    const btnVaciar = document.getElementById("btn-vaciar");

    if (btnVaciar) {
        btnVaciar.addEventListener("click", () => {
            localStorage.removeItem("carrito");
            cargarCarrito();
        });
    }
});
