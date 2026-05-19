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

async function atualizarEquipamentos(req,res) {
    try{
        const {id} = req.params;
        const {nome, categoria, quantidade} = req.body;
        await equipamentoModel.atualizarEquipamentos(id,nome, categoria, quantidade)
        res.status(200).json({mensagem: "Produto atualizado"})
    } catch(erro){
        res.status(500).json(erro)
    }
    
}

async function deletarEquipamentos(req,res) {
    try{
        const {id} = req.params;
        await equipamentoModel.deletarEquipamentos(id);
        res.status(200).json({mensagem: "O equipamento foi deletado"})
    } catch(erro){
        res.status(500).json(erro)
    }
    
}
module.exports = {
    listarEquipamentos, cadastroEquipamentos, atualizarEquipamentos, deletarEquipamentos

}