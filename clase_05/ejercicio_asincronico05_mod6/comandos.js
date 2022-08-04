//comando black and white
const yargs = require('yargs') // es para crear comandos
const child_process = require('child_process') // para poder ejecuar un archivo externo ej. server.js

const argv = yargs.command(
    'ejecutar',
    'Comando ejecutar servidor',
    {
        puerto: {
            describe: 'numero puerto',
            demand: true,
            alias: 'p'
        },
        key: {
            describe: 'clave',
            demand: true,
            alias: 'k'
        }
    },
    //generamos una funcion para que el comando que se escribe en consola realice una accion
    function (argumentos) {
        const puerto = argumentos.puerto
        const clave = argumentos.key

        if (clave == '123') {
            child_process.exec('node server.js')
            console.log(`Servidor corriendo en http://127.0.0.1:${puerto}/`)
        } else {
            console.log('contraseña incorrecta')
        }
    }
).help().argv
