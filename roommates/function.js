const fs = require('fs').promises

function getForm  (req) {
    return new Promise((res, rej) => {
      let str = ''
      req.on('data', function (chunk) {
        str += chunk
      })
      req.on('end', function () {
        //console.log('str', str);
        const obj = JSON.parse(str)
        res(obj)
      })
    })
  }
const crearRoommates = async function (nuevoRoommates) {
    //Leemos el contenido del archivo 'db.json'
    let archivo_db = await fs.readFile('db.json', 'utf8');
    // 2. Transformamos su contenido (string) a un objeto de JS
    archivo_db = JSON.parse(archivo_db)
    // 3. Le agregamos el nuevo usuario al array 'users
    archivo_db.roommates.push(nuevoRoommates)
    // 4. Volvemos a transformar el contenido a String
    archivo_db = JSON.stringify(archivo_db)
    // 5. Sobreescribimos el contenido del archivo 'db.json'
    await fs.writeFile('db.json', archivo_db, 'utf8') 
  }
const mostrarRoommates = async function () {
    //Leemos el contenido del archivo 'db.json'
    let archivo_db = await fs.readFile('db.json', 'utf8')
    //Transformamos su contenido (string) a un objeto de JS
    archivo_db = JSON.parse(archivo_db)
    // Retornar la propiedad 'users' del archivo leído
    let  debe = 0
    for(let gasto of archivo_db.gastos){
     debe += gasto.monto
    }
    debe = debe/archivo_db.roommates.length
    for(let roomie of archivo_db.roommates){
     //recibir a los roommates como variable
     const gastos_roomie = archivo_db.gastos.filter(g => g.roommates == roomie.nombre)
     let recibe_roomie = 0
     for(let gasto of gastos_roomie){
       recibe_roomie += gasto.monto
     }
     roomie.recibe = recibe_roomie
     //debe
     roomie.debe = debe
    }
    return archivo_db.roommates
  }
const crearGastos = async function (nuevoGasto) {
  //Leemos el contenido del archivo 'db.json'
    let archivo_db = await fs.readFile('db.json', 'utf8')
  //Transformamos su contenido (string) a un objeto de JS
    archivo_db = JSON.parse(archivo_db)
  // añadimos el nuevo gasto
    archivo_db.gastos.push(nuevoGasto)
  // Volvemos a transformar el contenido a String
    archivo_db = JSON.stringify(archivo_db)
  //Sobreescribimos el contenido del archivo 'db.json'
    await fs.writeFile('db.json', archivo_db, 'utf8') 
  } 
const mostrarHistorialGastos = async function () {
    // 1. Leemos el contenido del archivo 'db.json'
    let archivo_db = await fs.readFile('db.json', 'utf8')
    // 2. Transformamos su contenido (string) a un objeto de JS
    archivo_db = JSON.parse(archivo_db)
    // Retornar la propiedad 'users' del archivo leído
    return archivo_db.gastos
    //console.log(archivo_db)
    
  }
const eliminarUsuario= async function (id){
    let archivo_db = await fs.readFile('db.json','utf-8') //traemos la bd
    archivo_db = JSON.parse(archivo_db)//json
    archivo_db.gastos = archivo_db.gastos.filter(g => g.id !=id);
   
    archivo_db = JSON.stringify(archivo_db);
    await fs.writeFile('db.json', archivo_db, 'utf8');
  }
const editarHistorial = async function (id,nombre,desc,monto){
    let archivo_db = await fs.readFile('db.json','utf-8') //traemos la bd
    archivo_db = JSON.parse(archivo_db)//json
  
    // obtenemos el gasto a cambiar
    const gasto = archivo_db.gastos.find(g => g.id == id)
    
    // calculamos la diferencia en gastos (15000, 10000)
    const diferenciaGasto = gasto.monto - monto
  
    // nos traemos al antiguo y nuevo creador
    const antiguoCreador = archivo_db.roommates.find(r => r.nombre == gasto.roommates)
    const nuevoCreador = archivo_db.roommates.find(n => n.nombre == nombre)
    
    // actualizamos los "recibe"
    antiguoCreador.recibe -= gasto.monto
    nuevoCreador.recibe += monto
    
    // le cambiamos sus atributos al gasto
    gasto.roommates = nombre
    gasto.descripcion = desc
    gasto.monto = monto
  
    // actualizamos los "debe"
    console.log(diferenciaGasto);
    for (let roomie of archivo_db.roommates) {
      roomie.debe -= diferenciaGasto/(archivo_db.roommates.length)
    }
  
    // por último, guardamos el archivo
    archivo_db = JSON.stringify(archivo_db)
    await fs.writeFile('db.json', archivo_db, 'utf8')
  }
module.exports = { getForm, crearRoommates, mostrarRoommates, crearGastos, mostrarHistorialGastos, eliminarUsuario, editarHistorial}