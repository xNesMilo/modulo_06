const axios = require('axios')

const nombre_estacion = process.argv[3]

if (nombre_estacion == undefined) {
    console.error('Debe especificar el nombre de la estacion')
    process.exit(1)
}

async function getClima(nombre_estacion) {
    console.log(`Obteniendo los datos de :${nombre_estacion}`);
    //1.Obtenemos datos de las estaciones
    const resp = await axios.get('https://api.gael.cloud/general/public/clima')
    const estaciones = resp.data

    //2.Buscamos la estacion que nos interesa
    const estacion = estaciones.find(est = est.Estacion == nombre_estacion)
    console.log(estaciones);

    //3. Chequeamos estacion no existente
    if(estacion == undefined) {
        console.log('Esa estacion no existe');
        process.exit(1);
    }
    //4. Retornamos los datos del clima al usuario
    console.log(`La temperatura en ${nombre_estacion} es de ${estacion.Temp}°C y la humedad es del ${estacion.Humedad}%`);
}
getClima(nombre_estacion)