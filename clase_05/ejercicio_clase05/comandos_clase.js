const yargs = require('yargs');
const chalk = ('chalk');

const argv = yargs.command(
    'ping',
    'recibe un numero y retorna pong',
    {
        numero: {
            describe: 'definir el numero para pong',
            demand: true,
            alias: 'n'
        }
    },
    function (args) {
        let numero = parseInt(args.numero)
        for (let i = 1; i <= numero; i++) {
            console.log('pong')
        }
    }
).help().argv;