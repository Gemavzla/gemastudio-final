// Esperar a que todo el contenido del DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. FUNCIONALIDAD DE NAVEGACIÓN SUAVE (SMOOTH SCROLLING)
    // Selecciona todos los enlaces que empiezan con "#"
    const enlacesMenu = document.querySelectorAll('nav ul li a[href^="#"]');
    
    enlacesMenu.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault(); // Evita el salto brusco por defecto
            
            const destino = document.querySelector(this.getAttribute('href'));
            
            // Si el destino existe, haz el scroll suave
            if(destino) {
                window.scrollTo({
                    top: destino.offsetTop - 20, // -20px para no pegar la sección al techo
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. SALUDO INTERACTIVO DEPENDIENDO DE LA HORA
    // Buscamos el párrafo en la sección "Sobre Mí"
    const seccionSobreMi = document.querySelector('#sobre-mi p');
    
    if (seccionSobreMi) {
        const horaActual = new Date().getHours();
        let saludo = "Hola";
        
        if (horaActual >= 6 && horaActual < 12) {
            saludo = "Buenos días";
        } else if (horaActual >= 12 && horaActual < 19) {
            saludo = "Buenas tardes";
        } else {
            saludo = "Buenas noches";
        }
        
        // Reemplazamos el "Hola" original por el saludo dinámico
        seccionSobreMi.innerHTML = seccionSobreMi.innerHTML.replace("Hola", saludo);
    }

    // 3. LIGHTBOX PARA LA GALERÍA FOTOGRÁFICA
    // Seleccionamos todas las imágenes dentro de la sección portafolio
    const imagenesGaleria = document.querySelectorAll('#portafolio img');
    
    // Creamos los elementos del modal (lightbox)
    const modal = document.createElement('div');
    modal.classList.add('lightbox-modal');
    
    const imagenModal = document.createElement('img');
    const cerrarModal = document.createElement('span');
    cerrarModal.classList.add('cerrar-modal');
    cerrarModal.innerHTML = '&times;'; // Símbolo de X
    
    // Armamos el modal
    modal.appendChild(cerrarModal);
    modal.appendChild(imagenModal);
    document.body.appendChild(modal);
    
    // Añadimos evento a cada imagen para abrir el modal
    imagenesGaleria.forEach(img => {
        // Cambiamos el cursor para indicar que son clickeables
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', () => {
            imagenModal.src = img.src; // Copiamos la ruta de la imagen clickeada
            modal.style.display = 'flex'; // Mostramos el modal
            
            // Añadimos una pequeña animación
            setTimeout(() => {
                modal.style.opacity = '1';
            }, 10);
        });
    });
    
    // Función para cerrar el modal
    const cerrarPantalla = () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300); // Espera a que termine la transición para ocultarlo
    };
    
    // Eventos para cerrar (clic en la X o clic fuera de la imagen)
    cerrarModal.addEventListener('click', cerrarPantalla);
    
    modal.addEventListener('click', (e) => {
        // Cierra solo si haces clic en el fondo oscuro, no en la imagen misma
        if (e.target === modal) {
            cerrarPantalla();
        }
    });

    // Cerrar con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && modal.style.display === 'flex') {
            cerrarPantalla();
        }
    });
});