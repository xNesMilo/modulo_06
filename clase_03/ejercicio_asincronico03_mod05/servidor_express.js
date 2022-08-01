const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.static('public'));

//Crear archivo
app.get('/crear', (req, res) => {
    const nombre = req.query.nombre
    const contenido = req.query.contenido

    function crearArchivo() {
        fs.writeFile(`archivos/${nombre}.txt`, contenido, 'utf8', function () {
            console.log('Archivo creado');
        })
    }
    crearArchivo();
    console.log(req.query)
    res.send('Archivo creado');
})

//Leer archivo
app.get('/leer', (req, res) => {
    const nombre = req.query.leer
    fs.readFile(`archivos/${nombre}.txt`, 'utf8', function(err, data){
        console.log(data);
        res.send(`<h1> ${data} </h1>`);
    })
})

//Renombrar archivo.
app.get('/renombrar', (req, res) => {
    const renombrar = req.query.renombrar
    const nuevo = req.query.nuevo
    fs.rename(`archivos/${nuevo}.txt`, 'archivos/' + renombrar + '.txt', function(){
        res.send('Archivo editado');
    } )
    })


//Eliminar archivo.
app.get('/eliminar', (req, res) => {
    eliminar = req.query.eliminar
    fs.unlink(`archivos/${eliminar}.txt`, function () {
        res.send('Archivo Eliminado');
    })
}); 

//Aviso de pagina no implementada
app.get('*', (req, res) => {
    res.send('Página aún no implementada');
    })

//Puerto 3000
app.listen(3000, function () {
    console.log('Servidor ejecutando');
});