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

document.addEventListener("DOMContentLoaded", () => {

let products = [
  {
    id: 1,
    name: "nintendo switch",
    price: 120000,
    image: "https://puntoscolombia.vtexassets.com/arquivos/ids/28181134-800-auto?v=638630930841900000&width=800&height=auto&aspect=true",
    category: "nintendo"
  },
  {
    id: 2,
    name: "base de playstation 5",
    price: 329900,
    image: "https://bannerlandpty.com/wp-content/uploads/2023/12/aceptamos_con_bit.jpg",
    category: "accesorios"
  },
  {
    id: 3,
    name: "playstation 5",
    price: 299000,
    image: "https://cosonyb2c.vtexassets.com/arquivos/ids/360392-800-800?v=638645914784400000&width=800&height=800&aspect=true",
    category: "playstation"
  },
  {
    id: 4,
    name: "xbox series x",
    price: 199900,
    image: "https://i0.wp.com/boxyc.com.co/wp-content/uploads/2024/04/65.png?fit=500%2C500&ssl=1",
    category: "xbox"
  },
  {
    id: 5,
    name: "control xbox series x",
    price: 199900,
    image: "https://www.alkomprar.com/medias/889842654776-001-750Wx750H?context=bWFzdGVyfGltYWdlc3wxNjkwOHxpbWFnZS93ZWJwfGFEa3hMMmd6TkM4eE5ETTFNakF3TXpBd05qUTVOQzg0T0RrNE5ESTJOVFEzTnpaZk1EQXhYemMxTUZkNE56VXdTQXwwZjQ1YWQyOGU4ZTNlNThjMzU5YWFhZWIxNDQzYTFkMzcxZjdlZTZjNGEzNDAwZDkyYzdkYjkxMmVhYTVjN2Vk",
    category: "accesorios"
  },
];

let cart = [];

const grid = document.getElementById("productGrid");
const cartItems = document.getElementById("cartItems");
const count = document.getElementById("count");
const subtotalEl = document.getElementById("subtotal");

// ---------------- PRODUCTOS ----------------
function renderProducts(lista = products) {
  grid.innerHTML = "";
  lista.forEach(p => {
    grid.innerHTML += `
      <div class="card">
        <img src="${p.image}">
        <h4>${p.name}</h4>
        <div class="price">$${p.price.toLocaleString("es-CO")}</div>
        <button onclick="addToCart(${p.id})">Agregar</button>
        <button onclick="deleteProduct(${p.id})">❌ Eliminar</button>
      </div>
    `;
  });
}

// ---------------- ELIMINAR PRODUCTO ----------------
window.deleteProduct = function(id) {
  if (!confirm("¿Eliminar este producto?")) return;

  products = products.filter(p => p.id !== id);
  cart = cart.filter(i => i.id !== id);

  renderProducts();
  renderCart();
};


// ---------------- CARRITO ----------------
window.addToCart = function(id) {
  const prod = products.find(p => p.id === id);
  const item = cart.find(i => i.id === id);

  if (item) item.quantity++;
  else cart.push({ ...prod, quantity: 1 });

  renderCart();
};

function renderCart() {
  count.innerText = cart.reduce((a, i) => a + i.quantity, 0);

  if (cart.length === 0) {
    cartItems.innerHTML = "Carrito vacío";
    subtotalEl.innerText = "$0";
    return;
  }

  cartItems.innerHTML = cart.map(i => `
    <div class="cart-item">
      ${i.name} - $${i.price.toLocaleString("es-CO")} x ${i.quantity}
      <button onclick="removeItem(${i.id})">🗑️</button>
    </div>
  `).join("");

  const total = cart.reduce((a, i) => a + i.price * i.quantity, 0);
  subtotalEl.innerText = "$" + total.toLocaleString("es-CO");
}

window.removeItem = function(id) {
  cart = cart.filter(i => i.id !== id);
  renderCart();
};

// ---------------- FINALIZAR COMPRA + WHATSAPP ----------------
document.querySelector(".finalizar-compra").addEventListener("click", () => {
  if (cart.length === 0) return alert("Carrito vacío");

  const nombre = prompt("Ingresa tu nombre:");
  const telefonoCliente = prompt("Ingresa tu teléfono:");
  const direccion = prompt("Ingresa tu dirección o lugar de entrega");

  if (!nombre || !telefonoCliente || !direccion) {
    return alert("Debes completar todos los datos");
  }

  const fecha = new Date().toLocaleString("es-CO");

  const telefonoNegocio = "573001234567"; // 👈 CAMBIA TU NÚMERO

  let mensaje = `🛒 *NUEVO PEDIDO*%0A%0A`;

  mensaje += `👤 Nombre: ${nombre}%0A`;
  mensaje += `📱 Cliente: ${telefonoCliente}%0A`;
  mensaje += `📍 Dirección: ${direccion}%0A`;
  mensaje += `📅 Fecha: ${fecha}%0A%0A`;

  mensaje += `📦 Productos:%0A`;

  cart.forEach(p => {
    mensaje += `• ${p.name} x${p.quantity} - $${p.price.toLocaleString("es-CO")}%0A`;
  });

  const total = cart.reduce((a, i) => a + i.price * i.quantity, 0);
  mensaje += `%0A💰 Total: $${total.toLocaleString("es-CO")}`;

  const url = `https://wa.me/${telefonoNegocio}?text=${mensaje}`;

  window.open(url, "_blank");

  document.getElementById("overlay").style.display = "flex";
  document.getElementById("mensajePedido").innerHTML = `
    <h3>¡Pedido confirmado! ✅</h3>
    <p><b>Nombre:</b> ${nombre}</p>
    <p><b>Teléfono:</b> ${telefonoCliente}</p>
    <p><b>Dirección:</b> ${direccion}</p>
    <p><b>Fecha:</b> ${fecha}</p>
    <p><b>Total productos:</b> ${cart.length}</p>
  `;

  cart = [];
  renderCart();
});

// ---------------- CERRAR MODAL ----------------
window.cerrarModal = () =>
  document.getElementById("overlay").style.display = "none";

// INICIO
renderProducts();

});
document.querySelector(".finalizar-compra").addEventListener("click", () => {
  if (cart.length === 0) return alert("Carrito vacío");

  // 👤 DATOS DEL CLIENTE
  const nombre = prompt("Ingresa tu nombre:");
  const telefonoCliente = prompt("Ingresa tu número de teléfono:");
  const direccion = prompt("Ingresa tu dirección  o lugar de entrega:");

  const fecha = new Date().toLocaleString("es-CO");

  if (!nombre || !telefonoCliente || !direccion) {
    return alert("Debes completar todos los datos");
  }

  // 📱 TU WHATSAPP (negocio)
  const telefonoNegocio = "573001234567";

  // 🧾 MENSAJE
  let mensaje = `🛒 *NUEVO PEDIDO PULPOGAMES*%0A%0A`;

  mensaje += `👤 *Nombre:* ${nombre}%0A`;
  mensaje += `📱 *Cliente:* ${telefonoCliente}%0A`;
  mensaje += `📍 *Dirección:* ${direccion}%0A`;
  mensaje += `📅 *Fecha:* ${fecha}%0A%0A`;

  mensaje += `📦 *Productos:*%0A`;

  cart.forEach(p => {
    mensaje += `• ${p.name} x${p.quantity} - $${p.price.toLocaleString("es-CO")}%0A`;
  });

  const total = cart.reduce((a, i) => a + i.price * i.quantity, 0);
  mensaje += `%0A💰 *Total:* $${total.toLocaleString("es-CO")}`;

  // 🔗 WhatsApp
  const url = `https://wa.me/${telefonoNegocio}?text=${mensaje}`;

  window.open(url, "_blank");

  // 🧾 Confirmación en pantalla
  document.getElementById("overlay").style.display = "flex";
  document.getElementById("mensajePedido").innerHTML = `
    <h3>¡Pedido confirmado! ✅</h3>
    <p><b>Nombre:</b> ${nombre}</p>
    <p><b>Teléfono:</b> ${telefonoCliente}</p>
    <p><b>Dirección:</b> ${direccion}</p>
    <p><b>Fecha:</b> ${fecha}</p>
    <p><b>Total productos:</b> ${cart.length}</p>
  `;

  cart = [];
  renderCart();
});

