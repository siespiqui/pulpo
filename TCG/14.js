document.addEventListener("DOMContentLoaded", () => {

let products = [
  {
    id: 1,
    name: "halo",
    price: 120000,
    image: "https://imagenes.hobbyconsolas.com/files/image_1920_1080/uploads/imagenes/2024/11/07/6903f021274bb.jpeg",
    category: "cartas"
  },
  {
    id: 2,
    name: "bayonetta",
    price: 329900,
    image: "https://www.konami.com/kde_cms/eu_publish/uploads/lost_art_cards_es-600x322.png",
    category: "cartas"
  },
  {
    id: 3,
    name: "good of war",
    price: 299000,
    image: "https://e01-expansion.uecdn.es/assets/multimedia/imagenes/2015/06/06/14336142429158.jpg",
    category: "figuras"
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

