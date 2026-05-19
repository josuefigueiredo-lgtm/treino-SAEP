const db = require('../db.js')


async function listarProdutos() {
    const [produtos] = await db.query('SELECT * from equipamentos');
    return produtos
    
}

async function cadastrarProdutos(nome, quantidade, categoria) {
    const [produto] = await db.query('INSERT INTO equipamentos(nome, quantidade,categoria) VALUES (?,?,?)', [nome, quantidade,categoria])
    return produto;
}

async function atualizarProdutos(idEquipamentos, nome, quantidade, categoria) {
    const [produto] = await db.query('UPDATE equipamentos SET nome=?, quantidade=?, categoria=? WHERE idEquipamentos=?', [nome, quantidade, categoria,idEquipamentos])
    return produto
}

async function deletarPedidos(id) {
    await db.query("DELETE FROM equipamentos WHERE idEquipamentos=?", [id])
    return true
    
}

module.exports = {
    listarProdutos, cadastrarProdutos, atualizarProdutos, deletarPedidos
}