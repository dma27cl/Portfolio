let btnConvert = document.getElementById("btnConvert");
const mostrarConv = document.querySelector("#resultadoConvert");

btnConvert.addEventListener("click", () => {
    var pesos = document.getElementById("pesos").value;
    var conversion = document.getElementById("conversion").value;
    if (pesos != "") {
        convertMoney(pesos, conversion);
        muestraGrafico(conversion);
    } else {
        alert("Debes ingresar una cantidad");
    }
});

//funcion para traer API
async function convertMoney(pesos, conversion) {
    try {
        const res = await fetch("https://mindicador.cl/api")
        var datos = await res.json();
    } catch {
        alert("error");
    }
    switch (conversion) {
        case "dolar":
            mostrarConv.innerHTML = `$${(pesos / parseFloat(datos.dolar.valor)).toFixed(3)} ${datos.dolar.nombre
                }`;
            break;
        case "euro":
            mostrarConv.innerHTML = `$${(pesos / parseFloat(datos.euro.valor)).toFixed(
                3
            )} ${datos.euro.nombre}`;
            break;
        case "uf":
            mostrarConv.innerHTML = `$${(pesos / parseFloat(datos.uf.valor)).toFixed(3)} ${datos.uf.nombre
                }`;
            break;
        default:
            console.log("No se puede convertir");
            break;
    }
}


//funcion mostrar valor ingresado 1
function mostrar(valor) {
    document.getElementById("cont").innerHTML = valor;
}

let lineChart = null;

async function muestraGrafico(conversion) {
    const res = await fetch(`https://mindicador.cl/api/${conversion}`)
    var datos = await res.json();
    let dias = datos.serie.map((e) => e.fecha.slice(8, 10));
    let valores = datos.serie.map((e) => e.valor);
    var speedCanvas = document.getElementById("speedChart");

    let speedData = {
        labels: dias.slice(0, 10).reverse(),
        datasets: [
            {

                data: valores.slice(0, 10).reverse(),
                label: "Noviembre",
                pointBackgroundColor: "rgb(75, 192, 192)",
                fill: "rgb(75, 192, 192)",
                borderColor: "rgb(75, 192, 192)"
            }
        ]
    };
    if (lineChart != null) {
        lineChart.destroy();
    }
    lineChart = new Chart(speedCanvas, {
        type: "line",
        data: speedData
    });


}


