const express = require('express')
const axios = require('axios')
const uuid = require('uuid')
const moment = require('moment')
const fs = require('fs').promises

const app = express()

// para usar archivos estáticos
app.use(express.static('public'))

// para leer datos de formulario
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());

// function getForm(req) {
//     return new Promise((res, rej) => {
//         let str = ''
//         req.on('data', function (chunk) {
//             str += chunk
//         })
//         req.on('end', function () {
//             console.log('str', str);
//             const obj = JSON.parse(str)
//             res(obj)
//         })
//     })
// }


// const crear_usuario = async function (nuevo_usuario) {
//     // 1. Leemos el contenido del archivo 'db.json'
//     let archivo_db = await fs.readFile('db.json', 'utf8')
//     // 2. Transformamos su contenido (string) a un objeto de JS
//     archivo_db = JSON.parse(archivo_db)
//     // 3. Le agregamos el nuevo usuario al array 'users
//     archivo_db.users.push(nuevo_usuario)
//     // 4. Volvemos a transformar el contenido a String
//     archivo_db = JSON.stringify(archivo_db)
//     // 5. Sobreescribimos el contenido del archivo 'db.json'
//     await fs.writeFile('db.json', archivo_db, 'utf8')
// }
// const leer_usuarios = async function () {
//     // 1.// 1. Leemos el contenido del archivo 'db.json'
//     let archivo_db = await fs.readFile('db.json', 'utf8')
//     // 2. Transformamos su contenido (string) a un objeto de JS
//     archivo_db = JSON.parse(archivo_db)
//     // 3. Retornar la propiedad 'users' del archivo leído
//     return archivo_db.users
// }

//Ruta para llegar a Mailing
app.get('/mailing', async (req, res) => {
    //Variables globales de la funcion async.
    const correos = req.query.correos
    const asunto = req.query.asunto
    const contenido = req.query.contenido
    //API
    const resp = await axios.get('https://mindicador.cl/api/')
    console.log(resp.data);
    // se genera ID
    // const id_correo = uuid.v4()
    // //Fecha con Moment
    // let fecha = moment().locale('es').format('MMMM Do YYYY, h:mm:ss a');
    // //Relleno de mail
    // const relleno = `${contenido}: 
    //                 el valor del dolar el dia de hoy es: ${valor}
    //                 el valor del euro el dia de hoy es: ${valor}
    //                 el valor del uf el dia de hoy es: ${valor}
    //                 el valor del utm el dia de hoy es: ${valor}`
    //Verificacion de envio de datos del form
    console.log({correos, asunto, contenido});
    //para redirigir al contenido
    res.redirect('/');
})

// app.get('/new-user', async (req, res) => {
//     // 1. Pedimos un usuario al azar a la API de randomuser
//     const resp = await axios.get('https://randomuser.me/api')
//     const random_user = resp.data.results[0]

//     // 2. Generamos el ID único
//     const id_unico = uuid.v4()

//     // 3. Generamos un timestamp usando MomentJS
//     const timestamp = moment();

//     // 4. creamos el nuevo usuario
//     const nuevo_usuario = {
//         nombre: `${random_user.name.first} ${random_user.name.last}`,
//         email: random_user.email,
//         id: id_unico,
//         timestamp: timestamp
//     }
//     // 5. guardamos al usuario en la base de datos
//     await crear_usuario(nuevo_usuario)

//     res.redirect('/')
// })

app.get('*', (req, res) => {
    res.send('Página aún no implementada')
});

app.listen(3000, function () {
    console.log('servidor ejecutando correctamente');
})