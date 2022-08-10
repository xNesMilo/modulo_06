// traer las librerias con npm
const express = require('express');
const axios = require('axios');
const uuid = require('uuid');
const fs = require('fs').promises;
const nodemailer = require('nodemailer');
//traemos las funciones del modulo function
const {getForm, crearRoommates, mostrarRoommates, crearGastos, mostrarHistorialGastos, eliminarUsuario, editarHistorial,enviado } = require('./function.js');
const {transport, enviar} = require('./email.js')

// creamos la aplicacion web
const app = express()
// dejamos la pagina de inicio en la carpeta public
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//tomamos los datos de la api y creamos a los usuarios 
app.post('/roommates', async (req, res) => {
  //entramos a la api y generamos una variable
  const resp = await axios.get('https://randomuser.me/api')
  //la transformamos en un objeto
  const datos = resp.data
  //obtener nombre random desde la api 
  const nombre = `${datos.results[0].name.first} ${datos.results[0].name.last}`
  //obtener id
  const id_unico = uuid.v4()
  //crear construcctor roommate
  const nuevoRoommates = {
    id: id_unico,
    nombre: nombre
  }
  //llamamos a la promesa de funcion para crear el nuevo roommate
  await crearRoommates(nuevoRoommates)
  transport.sendMail(enviar, function (err, info) {
    if (err) {
      console.log('enviading');
      console.log('error', err);
    } else {
      console.log(info);
    }
  })
  res.json({})
})
//tomamos los datos de la db y los mostramos
app.get('/roommates', async (req, res) => {
  let roommates = await mostrarRoommates()
  res.json({ roommates })
})
// tomamos los datos del formulario para crear el historial
app.post('/gastos', async (req, res) => {
  //obtener datos del formulario
  const gasto = await getForm(req)
  //creamos la variables para rescatar los datos del formulario
  const roommates = gasto.roommates
  const descripcion = gasto.descripcion
  const monto = gasto.monto
  //obtener id
  const id_gasto = uuid.v4()

  const nuevoGasto = {
    id: id_gasto,
    roommates: roommates,
    descripcion: descripcion,
    monto: monto
  } 
  await crearGastos(nuevoGasto)
  //se debe traer a base, tranformar a objeto ,bscar posicion,modificarlar,se vuelve a texto,se sobre escribe el archivo
  res.json({})
})
app.get('/gastos', async (req, res) => {
  let gastos = await mostrarHistorialGastos()
  res.json({ gastos })
})
app.put('/gastos',async (req,res) =>{
  const gastosEditados = await getForm(req)

  const nombreEditado = gastosEditados.roommates;
  const descripcionEditado = gastosEditados.descripcion;
  const montoEditado = gastosEditados.monto;

  editarHistorial(req.query.id,nombreEditado,descripcionEditado,montoEditado)
  console.log(req.query.id, nombreEditado,descripcionEditado,montoEditado);
  res.send('holi')
})
app.delete('/gastos', async (req, res) => {
  
  const eliminado = req.query.id;
  console.log(eliminado);
  eliminarUsuario(eliminado)
  res.send('holi')
})
app.get('*', (req, res) => {
     res.send('Página aún no implementada')
 });
app.listen(3000, function () {
  console.log(`Servidor corriendo en http://localhost:${3000}/`)
})
