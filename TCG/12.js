// --- LÓGICA DE FILTROS ---
function filterGames(category) {
    const cards = document.querySelectorAll('.game-card');
    cards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// --- LÓGICA DEL CARRITO ---
let cart = [];

function addToCart(name, price, image) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ name, price, image, qty: 1 });
    }
    updateCartUI();
    document.getElementById('sideCart').classList.add('open');
}

function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.qty;
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" width="50">
                <div class="cart-info">
                    <p><strong>${item.name}</strong></p>
                    <p>${item.qty} x $${item.price.toLocaleString()}</p>
                </div>
                <button onclick="removeItem(${index})">❌</button>
            </div>
        `;
    });

    cartCount.innerText = cart.reduce((acc, i) => acc + i.qty, 0);
    cartItems.innerHTML += `<div class="cart-total"><h3>Total: $${total.toLocaleString()}</h3></div>`;
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCartUI();
}


// Selección del formulario y del contenedor de juegos
const productForm = document.getElementById('productForm');
const gameGrid = document.querySelector('.game-grid');

productForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que la página se recargue al enviar

    // 1. Capturar los valores escritos por el usuario
    const name = document.getElementById('prodName').value;
    const price = document.getElementById('prodPrice').value;
    const img = document.getElementById('prodImg').value;
    const category = document.getElementById('prodCategory').value;

    // 2. Crear el elemento HTML de la nueva tarjeta
    const newGameCard = document.createElement('div');
    newGameCard.classList.add('game-card');
    newGameCard.setAttribute('data-category', category);

    // 3. Formatear el precio para que se vea con puntos (ej: 250.000)
    const formattedPrice = new Intl.NumberFormat('es-CO').format(price);

    // 4. Insertar la estructura interna de la tarjeta
    newGameCard.innerHTML = `
        <img src="${img}" alt="${name}">
        <div class="game-info">
            <h3>${name}</h3>
            <span class="price">${formattedPrice} COP</span>
            <button class="add-to-cart" onclick="addToCart('${name}', ${price}, '${img}')">Añadir al Carrito</button>
        </div>
    `;

    // 5. Agregar la nueva tarjeta al inicio de la lista de juegos
    gameGrid.prepend(newGameCard);

    // 6. Limpiar el formulario y dar aviso
    productForm.reset();
    alert(`¡Genial! El juego "${name}" ha sido agregado al catálogo.`);
});


document.getElementById('formNuevoProducto').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que la página se refresque

    // Capturar los valores que escribiste
    const nombre = document.getElementById('nombreJuego').value;
    const precio = document.getElementById('precioJuego').value;
    const imagen = document.getElementById('imagenJuego').value;
    const categoria = document.getElementById('categoriaJuego').value;

    // Seleccionar el contenedor donde están los juegos
    const contenedor = document.querySelector('.game-grid');

    // Crear la estructura de la nueva tarjeta (Game Card)
    const nuevaTarjeta = document.createElement('div');
    nuevaTarjeta.className = 'game-card';
    nuevaTarjeta.setAttribute('data-category', categoria);

    // Formatear el precio con puntos (COP)
    const precioFormateado = new Intl.NumberFormat('es-CO').format(precio);

    nuevaTarjeta.innerHTML = `
        <img src="${imagen}" alt="${nombre}">
        <div class="game-info">
            <h3>${nombre}</h3>
            <span class="price">${precioFormateado} COP</span>
            <button class="add-to-cart" onclick="addToCart('${nombre}', ${precio}, '${imagen}')">Añadir al Carrito</button>
        </div>
    `;

    // Agregar el nuevo juego al principio de la lista
    contenedor.prepend(nuevaTarjeta);

    // Limpiar el formulario
    this.reset();
    alert("¡Juego agregado con éxito!");
});
let productos = [];

// MOSTRAR PRODUCTOS
function mostrarProductos() {
  let contenedor = document.getElementById("listaProductos");
  contenedor.innerHTML = "";

  productos.forEach((p, index) => {
    contenedor.innerHTML += `
      <div class="producto">
        <img src="${p.imagen}" alt="${p.nombre}">
        <h3>${p.nombre}</h3>
        <p>Precio: $${p.precio}</p>
        <button onclick="eliminarProducto(${index})">Eliminar</button>
      </div>
    `;
  });
}

// AGREGAR PRODUCTO
function agregarProducto() {
  let nombre = document.getElementById("nombre").value;
  let precio = document.getElementById("precio").value;
  let imagen = document.getElementById("imagen").value;

  if (nombre === "" || precio === "" || imagen === "") {
    alert("Completa todos los campos");
    return;
  }

  productos.push({
    nombre: nombre,
    precio: precio,
    imagen: imagen
  });

  mostrarProductos();

  // limpiar inputs
  document.getElementById("nombre").value = "";
  document.getElementById("precio").value = "";
  document.getElementById("imagen").value = "";
}

// ELIMINAR PRODUCTO
function eliminarProducto(index) {
  productos.splice(index, 1);
  mostrarProductos();
}