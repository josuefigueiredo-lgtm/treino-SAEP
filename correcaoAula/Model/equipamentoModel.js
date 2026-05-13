const db = require('../../db.js')

async function listarEquipamentos() {
    
    const [equipamentos] = await db.query("SELECT * FROM equipamentos")
    return equipamentos;
}

async function cadastroEquipamentos(nome, categoria, quantidade) {
    const [equipamentos] = await db.query("INSERT INTO equipamentos(nome, categoria, quantidade)VALUES (?,?,?)", [nome, categoria, quantidade]);
    return equipamentos;
    
}


module.exports = {
    listarEquipamentos, cadastroEquipamentos
}