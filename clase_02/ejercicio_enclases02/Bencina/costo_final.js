const child_process = require('child_process');

child_process.exec(`node kilometros.js`, function(err, datos1){
    let recorrido = Number(datos1)

    child_process.exec('node precio_bencina.js', function(err, datos2){
        let costo = Number(datos2)

        let resultado = (recorrido/costo*1172)

        console.log(resultado);
    })
})
()