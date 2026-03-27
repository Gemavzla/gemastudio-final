document.addEventListener("DOMContentLoaded", () => {
    
    // NAVEGACIÓN SUAVE AL HACER CLIC EN EL MENÚ
    const enlacesMenu = document.querySelectorAll('nav ul li a[href^="#"]');
    enlacesMenu.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault(); 
            const destino = document.querySelector(this.getAttribute('href'));
            if(destino) {
                window.scrollTo({
                    top: destino.offsetTop - 65, 
                    behavior: 'smooth'
                });
            }
        });
    });

    // CARRUSEL LIGHTBOX DE IMÁGENES
    const imagenesGaleria = document.querySelectorAll('.galeria-trigger');
    let imagenesActuales = []; 
    let indiceActual = 0; 
    
    // Crear el modal en HTML
    const modal = document.createElement('div');
    modal.classList.add('lightbox-modal');
    modal.innerHTML = `
        <span class="cerrar-modal">&times;</span>
        <span class="flecha-izq">&#10094;</span>
        <img class="imagen-modal" src="" alt="Imagen GemaStudio">
        <span class="flecha-der">&#10095;</span>
        <div class="contador-modal">1 / 1</div>
        <div class="cargando">Cargando...</div>
    `;
    document.body.appendChild(modal);
    
    const imagenModal = modal.querySelector('.imagen-modal');
    const btnCerrar = modal.querySelector('.cerrar-modal');
    const btnIzq = modal.querySelector('.flecha-izq');
    const btnDer = modal.querySelector('.flecha-der');
    const contador = modal.querySelector('.contador-modal');
    const textoCargando = modal.querySelector('.cargando');
    
    function mostrarImagen(indice) {
        imagenModal.style.opacity = '0'; 
        textoCargando.style.display = 'block';
        
        // Precargar la imagen para que no parpadee
        const imgPreload = new Image();
        imgPreload.src = imagenesActuales[indice];
        
        imgPreload.onload = () => {
            imagenModal.src = imagenesActuales[indice];
            contador.textContent = `${indice + 1} / ${imagenesActuales.length}`;
            textoCargando.style.display = 'none';
            
            if(imagenesActuales.length <= 1) {
                btnIzq.style.display = 'none';
                btnDer.style.display = 'none';
            } else {
                btnIzq.style.display = 'block';
                btnDer.style.display = 'block';
            }
            imagenModal.style.opacity = '1'; 
        };
    }
    
    imagenesGaleria.forEach(img => {
        img.addEventListener('click', () => {
            const urls = img.getAttribute('data-images');
            if(urls) {
                imagenesActuales = urls.split(',');
                indiceActual = 0; 
                mostrarImagen(indiceActual);
                modal.style.display = 'flex';
                setTimeout(() => modal.style.opacity = '1', 10);
            }
        });
    });
    
    btnDer.addEventListener('click', (e) => {
        e.stopPropagation(); 
        indiceActual = (indiceActual + 1) % imagenesActuales.length;
        mostrarImagen(indiceActual);
    });
    
    btnIzq.addEventListener('click', (e) => {
        e.stopPropagation();
        indiceActual = (indiceActual - 1 + imagenesActuales.length) % imagenesActuales.length;
        mostrarImagen(indiceActual);
    });
    
    const cerrarPantalla = () => {
        modal.style.opacity = '0';
        setTimeout(() => modal.style.display = 'none', 300); 
    };
    
    btnCerrar.addEventListener('click', cerrarPantalla);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) cerrarPantalla();
    });

    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === "Escape") cerrarPantalla();
            if (e.key === "ArrowRight") btnDer.click();
            if (e.key === "ArrowLeft") btnIzq.click();
        }
    });
});
