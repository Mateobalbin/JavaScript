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

