let {createTransport} = require('nodemailer')

const email = process.env.EMAIL_PEDIDOS;
const password = process.env.PASS_PEDIDOS

const transport = createTransport({
    service:'gmail',
    port: 587,
    auth: {
        user: email,
        pass:password
    }
})

module.exports = transport