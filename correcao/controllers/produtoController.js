const produtosModel = require('../model/produtoModel')



async function listarProdutos(req,res) {
    try{
        const produtos = await produtosModel.listarProdutos();
        console.log(produtos)
        res.status(200).json(produtos)
    }catch(erro){
        res.status(500).json(erro)

    }
    
}

async function cadastrarProdutos(req,res) {
    try{
        const {nome, quantidade, categoria} = req.body;
        console.log(nome, quantidade)
       

        const produto = await produtosModel.cadastrarProdutos(nome, quantidade, categoria)
       
        
        res.status(201).send(`<script>alert('Equipamento cadastrado') 
            nome = localStorage.getItem("nome");
            window.location.href = 'http://127.0.0.1:5501/public/login.html?nome=${nome}';</script>`)}
    
    catch (erro){
        res.status(500).json(erro)
    }
    
}

async function atualizarProdutos(req, res) {
    try{
        const {id} = req.params;
        const {nome, quantidade, categoria} = req.body;
      
        await produtosModel.atualizarProdutos(id, nome, quantidade, categoria);
        res.status(200).json({mensagem: "Produto atualizado"})
    } catch(erro){
        res.status(500).json(erro)
    }
    
}

async function deletarPedidos(req,res) {

    try{
        const {id} = req.params;
        await produtosModel.deletarPedidos(id);
        res.status(200).json({mensagem: "Pedido deletado"})
    }catch(erro){
        res.status(500).json(erro)
    }
    
}
module.exports = {listarProdutos, cadastrarProdutos, atualizarProdutos, deletarPedidos}