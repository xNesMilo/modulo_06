const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mbensan.test@gmail.com',
        pass: 'dgdxbpvqozekxwkn'
    }
})

function enviar(receivers, asunto, mensaje) {
    const options = {
        from: 'mbensan.test@gmail.com',
        to: receivers,
        subject: asunto,
        html: mensaje
    }

    transport.sendMail(options, function (err, info) {
        if (err) {
            console.log('error', err);
            console.log('enviading');
        } else {
            console.log(info);
        }
    })
}

const por_defecto = ['mbensan@outlook.com', 'mbensan@ug.uchile.cl']

module.exports = {
    por_defecto,
    enviar
}