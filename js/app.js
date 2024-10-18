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






