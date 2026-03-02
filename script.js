document.getElementById("Menubtn")
document.getElementById("Contenedor")

window.addEventListener("scroll", () => {
    const progress = document.getElementById("progress");
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressPct = (window.scrollY / totalHeight) * 100;
    
    if (progress) {
        progress.style.width = progressPct + "%";
    }
});

Menubtn.addEventListener("click", function(){
  Contenedor.classList.toggle("oculto");
});

window.addEventListener('scroll', () => {
  console.log('Posición Y:', window.scrollY);
});

window.addEventListener("scroll", function() {
    const header = document.getElementById('header');
    header.classList.toggle("scrolled", window.scrollY);
})
  function iniciarReloj() {
            const display = document.getElementById('reloj');
            
            setInterval(() => {
                const ahora = new Date();
                const tiempo = ahora.toLocaleTimeString();
                display.textContent = tiempo;
            }, 1000);
        }
 iniciarReloj();


