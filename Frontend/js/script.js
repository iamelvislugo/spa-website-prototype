// MÉTODO DE PAGO
// Mostrar u ocultar los campos de tarjeta según la opción seleccionada en el método de pago
document.addEventListener("DOMContentLoaded", function () {
    const paymentMethod = document.getElementById("payment-method");
    const cardDetails = document.getElementById("cardDetails");

    paymentMethod.addEventListener("change", function () {
        if (paymentMethod.value === "tarjeta") {
            cardDetails.style.display = "block"; // Mostrar los detalles de la tarjeta
        } else {
            cardDetails.style.display = "none"; // Ocultar los detalles de la tarjeta
        }
    });
});


// Accionar la animación
document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-up, .slide-in-down, .scale-up, .fade-in, .rotate-in');

    function checkSlide() {
        const windowHeight = window.innerHeight;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();

            // Verifica si el elemento está visible en la ventana
            if (rect.top <= windowHeight && rect.bottom >= 0) {
                section.classList.add('active'); // Agrega la clase activa
            } else {
                section.classList.remove('active'); // Elimina la clase si no está visible
            }
        });
    }

    window.addEventListener('scroll', checkSlide);
    checkSlide(); // Comprueba inicialmente si está visible
});


