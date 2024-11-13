/*
function calcularCuota(principal, tasaInteres, periodos) {
    const tasaMensual = tasaInteres / 100 / 12;

    
    let denominador = 1;
    for (let i = 0; i < periodos; i++) {
        denominador *= (1 + tasaMensual);
    }
    denominador = 1 - (1 / denominador);

    const cuota = (principal * tasaMensual) / denominador;
    return cuota;
}

function ingresarDatos() {
    const montoPrestamo = parseFloat(prompt("Ingresa el monto del préstamo:"));
    const interesAnual = parseFloat(prompt("Ingresa la tasa de interés anual (en %):"));
    const numeroCuotas = parseInt(prompt("Ingresa el número de cuotas (meses):"));

    if (isNaN(montoPrestamo) || isNaN(interesAnual) || isNaN(numeroCuotas) || montoPrestamo <= 0 || interesAnual < 0 || numeroCuotas <= 0) {
        return false;
    }

    const cuotaMensual = calcularCuota(montoPrestamo, interesAnual, numeroCuotas);
    alert(`La cuota mensual es: ${cuotaMensual.toFixed(2)}`);
    return true;
}


ingresarDatos();
*/

/*
let prestamos = [];


function validarEntradas(monto, interes, cuotas) {
    if (isNaN(monto) || isNaN(interes) || isNaN(cuotas) || monto <= 0 || interes < 0 || cuotas <= 0) {
        alert("Por favor, ingresa valores válidos.");
        return false;
    }
    return true;
}


function calcularCuota(principal, tasaInteres, periodos) {
    const tasaMensual = tasaInteres / 100 / 12;
    let denominador = 1;

    for (let i = 0; i < periodos; i++) {
        denominador *= (1 + tasaMensual);
    }
    denominador = 1 - (1 / denominador);

    const cuota = (principal * tasaMensual) / denominador;
    return cuota;
}


function ingresarDatos() {
    const montoPrestamo = parseFloat(prompt("Ingresa el monto del préstamo:"));
    const interesAnual = parseFloat(prompt("Ingresa la tasa de interés anual (en %):"));
    const numeroCuotas = parseInt(prompt("Ingresa el número de cuotas (meses):"));

    if (validarEntradas(montoPrestamo, interesAnual, numeroCuotas)) {
        const cuotaMensual = calcularCuota(montoPrestamo, interesAnual, numeroCuotas);
        alert(`La cuota mensual es: ${cuotaMensual.toFixed(2)}`);

        
        const nuevoPrestamo = {
            monto: montoPrestamo,
            interes: interesAnual,
            cuotas: numeroCuotas,
            cuotaMensual: cuotaMensual.toFixed(2)
        };
        prestamos.push(nuevoPrestamo);
        console.log("Préstamo registrado:", nuevoPrestamo);
    }
}


function filtrarPrestamosPorCuotas() {
    const cuotasBuscar = parseInt(prompt("Ingresa el número de cuotas que deseas filtrar:"));
    if (isNaN(cuotasBuscar) || cuotasBuscar <= 0) {
        alert("Ingresa un número válido de cuotas.");
        return;
    }

    const prestamosFiltrados = prestamos.filter(prestamo => prestamo.cuotas === cuotasBuscar);

    if (prestamosFiltrados.length > 0) {
        console.log(`Préstamos con ${cuotasBuscar} cuotas:`, prestamosFiltrados);
    } else {
        console.log(`No se encontraron préstamos con ${cuotasBuscar} cuotas.`);
    }
}


ingresarDatos();
ingresarDatos();  


filtrarPrestamosPorCuotas();  
*/

// Clase para manejar los préstamos
class Prestamo {
    constructor(monto, interes, cuotas, cuotaMensual) {
        this.monto = monto;
        this.interes = interes;
        this.cuotas = cuotas;
        this.cuotaMensual = cuotaMensual;
        this.fecha = new Date().toLocaleDateString();
    }
}

// Clase principal para manejar la aplicación
class GestorPrestamos {
    constructor() {
        this.prestamos = this.cargarPrestamos();
        this.inicializarEventos();
    }

    // Inicializar eventos
    inicializarEventos() {
        document.getElementById('loanForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.procesarFormulario();
        });
        this.actualizarListaPrestamos();
    }

    // Validar entradas del formulario
    validarEntradas(monto, interes, cuotas) {
        if (isNaN(monto) || isNaN(interes) || isNaN(cuotas) || 
            monto <= 0 || interes < 0 || cuotas <= 0) {
            this.mostrarError("Por favor, ingresa valores válidos.");
            return false;
        }
        return true;
    }

    // Calcular cuota mensual
    calcularCuota(principal, tasaInteres, periodos) {
        const tasaMensual = tasaInteres / 100 / 12;
        const denominador = 1 - Math.pow(1 + tasaMensual, -periodos);
        return (principal * tasaMensual) / denominador;
    }

    // Procesar el formulario
    procesarFormulario() {
        const monto = parseFloat(document.getElementById('monto').value);
        const interes = parseFloat(document.getElementById('interes').value);
        const cuotas = parseInt(document.getElementById('cuotas').value);

        if (this.validarEntradas(monto, interes, cuotas)) {
            const cuotaMensual = this.calcularCuota(monto, interes, cuotas);
            const nuevoPrestamo = new Prestamo(monto, interes, cuotas, cuotaMensual);
            
            this.prestamos.push(nuevoPrestamo);
            this.guardarPrestamos();
            this.mostrarResultado(cuotaMensual);
            this.actualizarListaPrestamos();
            document.getElementById('loanForm').reset();
        }
    }

    // Mostrar resultado del cálculo
    mostrarResultado(cuotaMensual) {
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = `
            <h3>Resultado del Cálculo</h3>
            <p>Cuota Mensual: $${cuotaMensual.toFixed(2)}</p>
        `;
    }

    // Mostrar error
    mostrarError(mensaje) {
        const resultadoDiv = document.getElementById('resultado');
        resultadoDiv.innerHTML = `<p class="error">${mensaje}</p>`;
    }

    // Filtrar préstamos por número de cuotas
    filtrarPrestamos(cuotas) {
        const prestamosFiltrados = this.prestamos.filter(p => p.cuotas === cuotas);
        this.actualizarListaPrestamos(prestamosFiltrados);
    }

    // Actualizar lista de préstamos en el DOM
    actualizarListaPrestamos(lista = this.prestamos) {
        const container = document.getElementById('prestamosContainer');
        container.innerHTML = lista.map(p => `
            <div class="prestamo-item">
                <p>Fecha: ${p.fecha}</p>
                <p>Monto: $${p.monto.toFixed(2)}</p>
                <p>Interés: ${p.interes}%</p>
                <p>Cuotas: ${p.cuotas}</p>
                <p>Cuota Mensual: $${p.cuotaMensual.toFixed(2)}</p>
            </div>
        `).join('');
    }

    // Guardar préstamos en localStorage
    guardarPrestamos() {
        localStorage.setItem('prestamos', JSON.stringify(this.prestamos));
    }

    // Cargar préstamos desde localStorage
    cargarPrestamos() {
        const prestamosGuardados = localStorage.getItem('prestamos');
        return prestamosGuardados ? JSON.parse(prestamosGuardados) : [];
    }
}

// Inicializar la aplicación
const gestor = new GestorPrestamos();

// Función global para filtrar préstamos
function filtrarPrestamosPorCuotas() {
    const cuotas = parseInt(document.getElementById('filtrarCuotas').value);
    if (!isNaN(cuotas) && cuotas > 0) {
        gestor.filtrarPrestamos(cuotas);
    } else {
        gestor.mostrarError("Ingresa un número válido de cuotas para filtrar.");
    }
}




