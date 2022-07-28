const fs = require('fs');

function escribir(){
    const lista = `arroz\npan\naceite\nsal\ncarne`
    fs.writeFile('shopping.txt', lista, 'utf8', function () {
        setTimeout(function(){
            leer()
        },2000)
    })
}
escribir();

function leer(){
    fs.readFile('shopping.txt', 'utf8', function(error, datos){
        console.log(datos,)
        setTimeout(function(){
            renombrar()
        },2000)
    })
}
leer();

function renombrar(){
    fs.rename('shopping.txt', 'mini-market.txt', function(){
        setTimeout(function(){
            eliminar()
        },2000)
    })
}
renombrar();

function eliminar(){
    fs.unlink('mini-market.txt', function(){
        console.log('Documento Eliminado')
    })
}
eliminar()


