const db = require('../db')


async function login(matricula) {
    const [usuario] = await db.query('SELECT * FROM usuarios WHERE matricula=?', [matricula])
    return usuario;
}

module.exports = {
    login
}