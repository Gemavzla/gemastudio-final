document.addEventListener("DOMContentLoaded", () => {
    
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

    const imagenesGaleria = document.querySelectorAll('.galeria-trigger');
    let imagenesActuales = []; 
    let indiceActual = 0; 
    
    const modalLightbox = document.createElement('div');
    modalLightbox.classList.add('lightbox-modal');
    modalLightbox.innerHTML = `
        <span class="cerrar-modal">&times;</span>
        <span class="flecha-izq">&#10094;</span>
        <img class="imagen-modal" src="" alt="Imagen GemaStudio">
        <span class="flecha-der">&#10095;</span>
        <div class="contador-modal">1 / 1</div>
        <div class="cargando">Cargando...</div>
    `;
    document.body.appendChild(modalLightbox);
    
    const imagenModal = modalLightbox.querySelector('.imagen-modal');
    const btnCerrarLightbox = modalLightbox.querySelector('.cerrar-modal');
    const btnIzq = modalLightbox.querySelector('.flecha-izq');
    const btnDer = modalLightbox.querySelector('.flecha-der');
    const contador = modalLightbox.querySelector('.contador-modal');
    const textoCargando = modalLightbox.querySelector('.cargando');
    
    function mostrarImagen(indice) {
        imagenModal.style.opacity = '0'; 
        textoCargando.style.display = 'block';
        
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
                modalLightbox.style.display = 'flex';
                setTimeout(() => modalLightbox.style.opacity = '1', 10);
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
    
    const cerrarPantallaLightbox = () => {
        modalLightbox.style.opacity = '0';
        setTimeout(() => modalLightbox.style.display = 'none', 300); 
    };
    
    btnCerrarLightbox.addEventListener('click', cerrarPantallaLightbox);
    modalLightbox.addEventListener('click', (e) => {
        if (e.target === modalLightbox) cerrarPantallaLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (modalLightbox.style.display === 'flex') {
            if (e.key === "Escape") cerrarPantallaLightbox();
            if (e.key === "ArrowRight") btnDer.click();
            if (e.key === "ArrowLeft") btnIzq.click();
        }
    });

    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = header.nextElementSibling;
            
            if (item.classList.contains('active')) {
                item.classList.remove('active');
                content.style.maxHeight = null;
            } else {
                document.querySelectorAll('.accordion-item').forEach(otherItem => {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.maxHeight = null;
                });
                
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        }); 
    });


    document.querySelectorAll('.open-plan-modal').forEach(boton => {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetId = this.getAttribute('data-target');
            const targetModal = document.getElementById(targetId);
            
            if (targetModal) {
                targetModal.classList.add('active');
                targetModal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; 
            }
        });
    });


    document.querySelectorAll('.close-plan-modal').forEach(botonCerrar => {
        botonCerrar.addEventListener('click', function() {
            const modalActual = this.closest('.plan-modal');
            if (modalActual) {
                modalActual.classList.remove('active');
                modalActual.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });


    document.querySelectorAll('.plan-modal').forEach(modal => {
        modal.addEventListener('click', function(e) {

            if (e.target === this) {
                this.classList.remove('active');
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

});
