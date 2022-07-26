//Variables y Require.
const axios = require('axios');
const fs = require('fs');
const moment = require('moment');
let valor_moneda;

//Funcion asincrona.
async function getDivisa(){
    const url = 'https://mindicador.cl/api/'
    const divisa = process.argv[4]
    const resp = await axios.get(url + divisa);
    let fecha = moment().locale('es').format('MMMM Do YYYY, h:mm:ss a');
    const nombre_archivo = process.argv[2]+ '.' + process.argv[3]
    const dinero = process.argv[5]
    const divisas = resp.data
    valor_moneda = (divisas.serie[0].valor);
    const total = dinero/valor_moneda;
    const relleno = `A la fecha: ${fecha}
    Fue realizada cotización con los siguientes datos:
    Cantidad de pesos a convertir: ${dinero} pesos
    Convertido a "${divisa}" da un total de: $${total}.-`
    function crear_documento() {
        fs.writeFile(`${nombre_archivo}`, relleno, 'utf8', function(){
            console.log('Archivo creado')
        })
    } crear_documento()
}
getDivisa()

//Leer documento.
function leer() {
fs.readFile('documento_importante.txt', 'utf8', function(err, res){
    console.log(res)
})
}
leer()



