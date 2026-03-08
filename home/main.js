/**
 * PULPOGAMES - JavaScript Maestro
 * Administra la lógica global, navegación entre carpetas y componentes UI.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. CONFIGURACIÓN DEL LOGO (Navegación inteligente) ---
    const mainLogo = document.getElementById("mainLogo");
    if (mainLogo) {
        mainLogo.style.cursor = "pointer";
        mainLogo.onclick = () => {
            const path = window.location.pathname;
            // Si el archivo actual está en la carpeta 'home', va directo a index.html
            // Si está en otra carpeta (Videojuegos, TCG, etc.), sube un nivel con '../'
            if (path.includes("/home/")) {
                window.location.href = "index.html";
            } else {
                window.location.href = "../home/index.html";
            }
        };
    }

    // --- 2. LÓGICA DEL CARRITO (Global) ---
    const cartBtn = document.getElementById("cartBtn");
    const sideCart = document.getElementById("sideCart");
    const closeCart = document.getElementById("closeCart");
    const cartCount = document.getElementById("cartCount");

    // Abrir/Cerrar Carrito
    if (cartBtn && sideCart) {
        cartBtn.onclick = () => sideCart.classList.add("active");
    }
    if (closeCart && sideCart) {
        closeCart.onclick = () => sideCart.classList.remove("active");
    }

    // Función global para añadir productos
    // Se usa 'window' para que sea accesible desde los onclick="addToCart(...)" del HTML
    window.addToCart = (name, price) => {
        if (cartCount) {
            let currentCount = parseInt(cartCount.innerText);
            cartCount.innerText = currentCount + 1;
            alert(`${name} ha sido añadido al carrito.\nPrecio: ${price} COP`);
        }
    };

    // --- 3. MODAL DE USUARIO (Con efecto Blur) ---
    const loginBtn = document.getElementById("loginBtn");
    const modalUser = document.getElementById("modalUser");

    if (loginBtn && modalUser) {
        loginBtn.onclick = () => {
            modalUser.style.display = "flex";
        };

        // Cerrar modal al hacer clic fuera del recuadro blanco
        window.addEventListener("click", (e) => {
            if (e.target === modalUser) {
                modalUser.style.display = "none";
            }
        });
    }

    // --- 4. BARRA DE BÚSQUEDA (Funcionalidad básica) ---
    const searchBar = document.getElementById("searchBar");
    if (searchBar) {
        searchBar.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                const query = e.target.value.toLowerCase().trim();
                if (query.length > 0) {
                    console.log("Buscando: " + query);
                    // Opcional: Redirigir a la página de videojuegos si busca algo
                    const path = window.location.pathname;
                    if (!path.includes("videojuegos.html")) {
                        window.location.href = path.includes("/home/") 
                            ? "../Videojuegos/videojuegos.html" 
                            : "../Videojuegos/videojuegos.html";
                    }
                }
            }
        });
    }

    // --- 5. FORMULARIO DE MANTENIMIENTO ---
    const maintenanceForm = document.getElementById("maintenanceForm");
    if (maintenanceForm) {
        maintenanceForm.onsubmit = (e) => {
            e.preventDefault();
            const date = document.getElementById("serviceDate").value;
            const consola = maintenanceForm.querySelector('select').value;
            
            if (date && consola) {
                alert(`¡Cita confirmada!\nEquipo: ${consola.toUpperCase()}\nFecha: ${date}\nNos pondremos en contacto contigo.`);
                maintenanceForm.reset();
            } else {
                alert("Por favor completa todos los campos.");
            }
        };
    }
});