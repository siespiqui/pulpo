// Seleccionamos los elementos por su ID
const boton = document.getElementById('miBoton');
const texto = document.getElementById('mensaje');

// Añadimos el evento de clic
boton.addEventListener('click', () => {
    // Cambiamos el texto
    texto.innerHTML = "¡Felicidades! Has interactuado con la web. 🎉";
    texto.style.color = "#28a745";
    texto.style.fontWeight = "bold";
    
    // Cambiamos el color de fondo del body aleatoriamente
    const colorAleatorio = '#' + Math.floor(Math.random()*16777215).toString(16);
    document.body.style.backgroundColor = colorAleatorio;
});