const express = require('express');
// const chalk = require('chalk')
const Jimp = require('jimp')
const axios = require('axios')
const moment = require('moment');

const app = express();

app.use(express.static('public'));

app.get('/cargar_imagen', async (req, res) => {

    const fecha = moment().locale('es').format('LLL');

    const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK)//Cargamos la fuente en una variable 
    const imagen = await Jimp.read(req.query.imagen)// 2. leemos la imagen desde el QueryString (formulario con GET)

    imagen.greyscale() // 3. Modificamos la imagen a blanco y negro
    imagen.quality(60)  //modifica la calidad
    imagen.resize(350, Jimp.AUTO) //ancho altura
        .print(font, 10, 10, fecha) //x,y
        .write('public/newImg.jpg')//guardamos la imagen

    res.redirect('/newImg.jpg')

    //console.log(req.query.imagen);
    // res.send('oki doki')
});

app.get('*', (req, res) => {
    res.send('Página aún no implementada')
});

app.listen(3000, function () {
    console.log(`Servidor corriendo en http://127.0.0.1:3000/`)
});