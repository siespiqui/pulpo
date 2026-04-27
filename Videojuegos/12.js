document.addEventListener("DOMContentLoaded", () => {

let products = [
  {
    id: 1,
    name: "halo",
    price: 120000,
    image: "https://juegosdigitalescolombia.com/files/images/productos/1644613415-halo-infinite-xbox-one.jpg",
    category: "xbox"
  },
  {
    id: 2,
    name: "bayonetta",
    price: 329900,
    image: "https://http2.mlstatic.com/D_NQ_NP_837796-MLA99441429154_112025-O.webp",
    category: "nintendo"
  },
  {
    id: 3,
    name: "good of war",
    price: 299000,
    image: "https://colombiajuegosdigitales.com/wp-content/uploads/2023/05/1624989119-god-of-war-ps5.jpg",
    category: "playstation"
  },
  {
    id: 4,
    name: "doom eternal",
    price: 199900,
    image: "https://store-images.s-microsoft.com/image/apps.35174.68242093704307898.f12bedc9-f130-4bf4-9b8f-e3ea0b8364bc.277b093f-2af6-4bbb-82a7-807055d9c5c5",
    category: "xbox"
  },
  {
    id: 5,
    name: "the last of us",
    price: 259900,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkWTlWeWs2Oh96JBpmmvNSwRGA8cZr8_5Ntw&s",
    category: "playstation"
  },
  {
    id: 6,
    name: "monster hunter",
    price: 299000,
    image: "https://juegosdigitalescolombia.com/files/images/productos/1638579630-monster-hunter-world-iceborne-master-edition-ps5.jpg",
    category: "nintendo"
  },
  {
    id: 7,
    name: "resident evil 4 remake",
    price: 9000,
    image: "https://static.wikia.nocookie.net/residentevil/images/6/62/RE4R_PS5_USA.jpg/revision/latest?cb=20230411182033&path-prefix=es",
    category: "xbox"
  }
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



// ---------------- FILTROS ----------------
document.querySelectorAll(".btn-filtro").forEach(btn => {
  btn.addEventListener("click", () => {
    const cat = btn.innerText.toLowerCase();
    if (cat === "todos") {
      renderProducts(products);
    } else {
      const filtered = products.filter(p => p.category === cat);
      renderProducts(filtered);
    }
  });
});

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

let index = 0;

const slides = document.getElementById("slides");
const total = slides.children.length;

const next = document.getElementById("next");
const prev = document.getElementById("prev");

// Mostrar imagen
function mostrar() {
  slides.style.transform = `translateX(-${index * 100}%)`;
}

// Botón siguiente
next.addEventListener("click", () => {
  index++;

  // 👉 si llega al final, vuelve al inicio
  if (index >= total) {
    index = 0;
  }

  mostrar();
});

// Botón anterior
prev.addEventListener("click", () => {
  index--;

  // 👉 si está en la primera, va a la última
  if (index < 0) {
    index = total - 1;
  }

  mostrar();
});

// Automático
setInterval(() => {
  index++;

  if (index >= total) {
    index = 0;
  }

  mostrar();
}, 3000);

