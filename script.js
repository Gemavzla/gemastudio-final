document.addEventListener("DOMContentLoaded", () => {
    
    // 1. FUNCIONALIDAD DE NAVEGACIÓN SUAVE (SMOOTH SCROLLING)
    const enlacesMenu = document.querySelectorAll('nav ul li a[href^="#"]');
    
    enlacesMenu.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault(); 
            const destino = document.querySelector(this.getAttribute('href'));
            
            if(destino) {
                window.scrollTo({
                    top: destino.offsetTop - 70, // Compensa el tamaño del header
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. LIGHTBOX AVANZADO (CARRUSEL)
    const imagenesGaleria = document.querySelectorAll('.galeria-trigger');
    let imagenesActuales = []; // Array temporal de las imágenes de la categoría clickeada
    let indiceActual = 0; // Foto que se está mostrando
    
    // Crear el HTML del modal en tiempo real
    const modal = document.createElement('div');
    modal.classList.add('lightbox-modal');
    modal.innerHTML = `
        <span class="cerrar-modal">&times;</span>
        <span class="flecha-izq">&#10094;</span>
        <img class="imagen-modal" src="" alt="Imagen ampliada">
        <span class="flecha-der">&#10095;</span>
        <div class="contador-modal">1 / 1</div>
    `;
    document.body.appendChild(modal);
    
    const imagenModal = modal.querySelector('.imagen-modal');
    const btnCerrar = modal.querySelector('.cerrar-modal');
    const btnIzq = modal.querySelector('.flecha-izq');
    const btnDer = modal.querySelector('.flecha-der');
    const contador = modal.querySelector('.contador-modal');
    
    // Función para mostrar una imagen específica
    function mostrarImagen(indice) {
        imagenModal.style.opacity = '0'; // Efecto fade out
        
        setTimeout(() => {
            imagenModal.src = imagenesActuales[indice];
            contador.textContent = `${indice + 1} / ${imagenesActuales.length}`;
            
            // Ocultar flechas si solo hay 1 foto
            if(imagenesActuales.length <= 1) {
                btnIzq.style.display = 'none';
                btnDer.style.display = 'none';
            } else {
                btnIzq.style.display = 'block';
                btnDer.style.display = 'block';
            }
            
            imagenModal.style.opacity = '1'; // Efecto fade in
        }, 150);
    }
    
    // Abrir Modal
    imagenesGaleria.forEach(img => {
        img.addEventListener('click', () => {
            // Obtener el array de imágenes separando por comas
            const urls = img.getAttribute('data-images');
            if(urls) {
                imagenesActuales = urls.split(',');
                indiceActual = 0; // Empezar por la primera
                
                mostrarImagen(indiceActual);
                modal.style.display = 'flex';
                setTimeout(() => modal.style.opacity = '1', 10);
            }
        });
    });
    
    // Navegación
    btnDer.addEventListener('click', (e) => {
        e.stopPropagation(); // Evitar que cierre el modal
        indiceActual = (indiceActual + 1) % imagenesActuales.length;
        mostrarImagen(indiceActual);
    });
    
    btnIzq.addEventListener('click', (e) => {
        e.stopPropagation();
        indiceActual = (indiceActual - 1 + imagenesActuales.length) % imagenesActuales.length;
        mostrarImagen(indiceActual);
    });
    
    // Cerrar modal
    const cerrarPantalla = () => {
        modal.style.opacity = '0';
        setTimeout(() => modal.style.display = 'none', 300); 
    };
    
    btnCerrar.addEventListener('click', cerrarPantalla);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) cerrarPantalla();
    });

    // Control con teclado (Flechas y Escape)
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === "Escape") cerrarPantalla();
            if (e.key === "ArrowRight") btnDer.click();
            if (e.key === "ArrowLeft") btnIzq.click();
        }
    });
});
