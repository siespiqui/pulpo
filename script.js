document.getElementById("Menubtn")
document.getElementById("Contenedor")

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
