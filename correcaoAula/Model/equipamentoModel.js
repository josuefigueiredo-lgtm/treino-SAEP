const db = require('../../db.js')

async function listarEquipamentos() {
    
    const [equipamentos] = await db.query("SELECT * FROM equipamentos")
    return equipamentos;
}

async function cadastroEquipamentos(nome, categoria, quantidade) {
    const [equipamentos] = await db.query("INSERT INTO equipamentos(nome, categoria, quantidade)VALUES (?,?,?)", [nome, categoria, quantidade]);
    return equipamentos;
    
}

async function atualizarEquipamentos(idEquipamentos,nome, categoria, quantidade) {
    await db.query("UPDATE equipamentos SET nome=?,categoria=?, quantidade=? WHERE idEquipamentos=?", [nome, categoria, quantidade, idEquipamentos])
}


async function deletarEquipamentos(idEquipamentos) {
    await db.query("DELETE FROM equipamentos WHERE idEquipamentos =?", [idEquipamentos])
    
}

module.exports = {
    listarEquipamentos, cadastroEquipamentos, atualizarEquipamentos, deletarEquipamentos
}