// Seleccionamos el formulario y el botón de envío
const reservationForm = document.getElementById('reservation-form');

// Definimos el tiempo de inactividad en milisegundos (20 minutos = 1200000 ms)
const inactivityTime =  2 * 60 * 1000;
 
// Variable para almacenar el temporizador
let resetTimer;

// Función para restablecer el formulario
function resetForm() {
    reservationForm.reset(); // Resetea todos los campos del formulario
    alert('Tu formulario se ha restablecido debido a inactividad.');
}

// Función para reiniciar el temporizador
function restartTimer() {
    clearTimeout(resetTimer); // Borra el temporizador anterior si existe
    resetTimer = setTimeout(resetForm, inactivityTime); // Configura un nuevo temporizador
}

// Escuchamos eventos del formulario para reiniciar el temporizador
reservationForm.addEventListener('input', restartTimer); // Cualquier cambio en los campos del formulario
reservationForm.addEventListener('mousemove', restartTimer); // Movimiento del mouse dentro del formulario
reservationForm.addEventListener('keydown', restartTimer); // Entrada del teclado dentro del formulario

// Inicia el temporizador cuando se carga la página
restartTimer();
