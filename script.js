// ===== FUNCIONALIDAD DEL FORMULARIO DE CONTACTO =====

// Esperamos a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Obtenemos el formulario de contacto por su ID
    const contactForm = document.getElementById('contactForm');
    
    // Agregamos un event listener para el evento 'submit' del formulario
    contactForm.addEventListener('submit', function(event) {
        // Prevenimos el comportamiento por defecto para manejar el envío manualmente
        event.preventDefault();
        
        // Obtenemos los valores del formulario
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Validamos que todos los campos estén llenos
        if (!name || !email || !message) {
            alert('Por favor, completa todos los campos del formulario.');
            return;
        }
        
        // Enviamos el formulario a Formspree usando fetch
        fetch('https://formspree.io/f/meopjkwq', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })
        })
        .then(response => {
            if (response.ok) {
                // Mostramos el mensaje en la consola del navegador
                console.log('Formulario enviado a Formspree correctamente');
                console.log('Datos del formulario:');
                console.log('Nombre:', name);
                console.log('Email:', email);
                console.log('Mensaje:', message);
                
                // Mostramos una alerta visual al usuario
                alert('¡Mensaje enviado correctamente! Te contactaremos pronto.');
                
                // Limpiamos el formulario después del envío
                contactForm.reset();
            } else {
                throw new Error('Error al enviar el formulario');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.');
        });
    });
});

// ===== NAVEGACIÓN SUAVE =====

// Función para hacer la navegación suave entre secciones
function smoothScroll() {
    // Obtenemos todos los enlaces de navegación
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Agregamos un event listener a cada enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Prevenimos el comportamiento por defecto del enlace
            event.preventDefault();
            
            // Obtenemos el ID de la sección a la que queremos ir
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Si la sección existe, hacemos scroll suave hacia ella
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== EFECTOS DE SCROLL PARA LA NAVEGACIÓN =====

// Función para cambiar el estilo de la barra de navegación al hacer scroll
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    // Agregamos un event listener para el evento 'scroll'
    window.addEventListener('scroll', function() {
        // Si hemos hecho scroll más de 100px, agregamos una clase
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(217, 60, 232, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            // Si no, mantenemos el estilo original
            navbar.style.background = 'rgba(217, 60, 232, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// ===== EFECTOS DE HOVER PARA LOS BOTONES "VER MÁS" =====

// Función para agregar efectos interactivos a los botones de proyectos
function addProjectButtonEffects() {
    // Obtenemos todos los botones "Ver más" de los proyectos
    const projectButtons = document.querySelectorAll('.project-card .btn-outline');
    
    // Agregamos efectos a cada botón
    projectButtons.forEach(button => {
        // Efecto al pasar el mouse por encima
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 10px 25px rgba(217, 60, 232, 0.3)';
        });
        
        // Efecto al quitar el mouse
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
        
        // Efecto al hacer clic
        button.addEventListener('click', function(event) {
            // Prevenimos el comportamiento por defecto
            event.preventDefault();
            
            // Obtenemos el título del proyecto
            const projectTitle = this.closest('.project-card').querySelector('h3').textContent;
            
            // Mostramos información del proyecto
            alert(`Proyecto: ${projectTitle}\n\nEste es un proyecto ficticio para demostrar las capacidades de Lina Villamizar. En un portafolio real, aquí se mostrarían más detalles del proyecto.`);
        });
    });
}

// ===== EFECTOS DE ANIMACIÓN AL SCROLL =====

// Función para agregar animaciones cuando los elementos entran en vista
function addScrollAnimations() {
    // Creamos un observer para detectar cuando los elementos entran en vista
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Si el elemento está visible
            if (entry.isIntersecting) {
                // Agregamos una clase de animación
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1, // Se activa cuando el 10% del elemento es visible
        rootMargin: '0px 0px -50px 0px' // Margen adicional
    });
    
    // Observamos las tarjetas de experiencia y proyectos
    const animatedElements = document.querySelectorAll('.experience-card, .project-card, .skill-tag');
    animatedElements.forEach(element => {
        // Configuramos el estado inicial
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Agregamos el elemento al observer
        observer.observe(element);
    });
}

// ===== EFECTOS DE HOVER PARA LAS TARJETAS =====

// Función para agregar efectos de hover a las tarjetas
function addCardHoverEffects() {
    // Efectos para las tarjetas de experiencia
    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efectos para las tarjetas de proyectos
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.03)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ===== FUNCIONALIDAD DE LAS REDES SOCIALES =====

// Función para agregar funcionalidad a los enlaces de redes sociales
function addSocialLinksFunctionality() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Prevenimos el comportamiento por defecto
            event.preventDefault();
            
            // Obtenemos el tipo de red social basado en el aria-label
            const socialType = this.getAttribute('aria-label');
            
            // Mostramos un mensaje informativo
            alert(`Enlace a ${socialType}\n\nEn un portafolio real, este enlace llevaría al perfil de Lina Villamizar en ${socialType}.`);
        });
    });
}

// ===== INICIALIZACIÓN DE TODAS LAS FUNCIONES =====

// Función principal que inicializa todas las funcionalidades
function initializePortfolio() {
    console.log('🚀 Inicializando portafolio de Lina Villamizar...');
    
    // Llamamos a todas las funciones de inicialización
    smoothScroll();
    handleNavbarScroll();
    addProjectButtonEffects();
    addScrollAnimations();
    addCardHoverEffects();
    addSocialLinksFunctionality();
    
    console.log('✅ Portafolio inicializado correctamente');
    console.log('📧 El formulario de contacto está listo para recibir mensajes');
    console.log('🎨 Todos los efectos visuales están activos');
}

// ===== EVENT LISTENER PARA CUANDO LA PÁGINA ESTÉ COMPLETAMENTE CARGADA =====

// Esperamos a que la página esté completamente cargada antes de inicializar
window.addEventListener('load', function() {
    // Pequeño delay para asegurar que todo esté renderizado
    setTimeout(initializePortfolio, 100);
});

// ===== FUNCIONES ADICIONALES PARA MEJORAR LA EXPERIENCIA =====

// Función para mostrar un mensaje de bienvenida
function showWelcomeMessage() {
    // Solo mostramos el mensaje si es la primera vez que visitan la página
    if (!localStorage.getItem('portfolioVisited')) {
        setTimeout(() => {
            alert('¡Bienvenido al portafolio de Lina Villamizar!\n\nExplora las diferentes secciones para conocer su experiencia profesional.');
            localStorage.setItem('portfolioVisited', 'true');
        }, 1000);
    }
}

// Función para agregar efectos de teclado (accesibilidad)
function addKeyboardNavigation() {
    // Agregamos navegación por teclado para los botones
    document.addEventListener('keydown', function(event) {
        // Si se presiona Enter en un botón, activamos su funcionalidad
        if (event.key === 'Enter' && event.target.classList.contains('btn')) {
            event.target.click();
        }
    });
}

// Llamamos a las funciones adicionales
showWelcomeMessage();
addKeyboardNavigation();

