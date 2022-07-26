const http = require('http')
const moment = require('moment')

const hostname = '127.0.0.1'
const port = 3000

const animales = ['rata', 'toro', 'tigre', 'conejo', 'dragon', 'serpiente', 'caballo', 'siervo', 'mono', 'gallo', 'perro', 'cerdo']


const server = http.createServer((req, res) => {
const dia = moment().locale('es').format('dddd')
res.setHeader('Content-Type', 'text/html')
res.end(Tu animal ramdom  ${animales[pos_azar(12)] ${dia}})
    const pos_azar = Math.floor(Math.random() * animales.length);
    const animal_azar = animales[pos_azar];
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end(animal_azar)
});
server.listen(port, hostname, () => {
    console.log(`Server running ar http://${hostname}:${
})