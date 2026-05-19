const equipamentoModel = require('../Model/equipamentoModel')

async function listarEquipamentos(req,res) {
    try{
        const equipamento = await equipamentoModel.listarEquipamentos();
 
        res.status(200).json(equipamento);
    } catch(erro){
        res.status(500).json(erro)
    }
    
}

async function cadastroEquipamentos(req,res) {
    try{
        const {nome, categoria, quantidade} = req.body;
        console.log(nome, categoria, quantidade)
        const equipamento = equipamentoModel.cadastroEquipamentos(nome, categoria, quantidade)
        res.status(201).send("O cadastro foi ok")
    } catch(error){
        res.status(500).json(error)
    }
    
}
module.exports = {
    listarEquipamentos, cadastroEquipamentos

}