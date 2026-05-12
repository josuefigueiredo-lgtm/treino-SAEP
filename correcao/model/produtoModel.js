const db = require('../db.js')


async function listarProdutos() {
    const [produtos] = await db.query('SELECT * from equipamentos');
    return produtos
    
}

async function cadastrarProdutos(nome, quantidade, categoria) {
    const [produto] = await db.query('INSERT INTO equipamentos(nome, quantidade,categoria) VALUES (?,?,?)', [nome, quantidade,categoria])
    return produto;
}

module.exports = {
    listarProdutos, cadastrarProdutos
}