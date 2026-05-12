const produtosModel = require('../model/produtoModel')


async function listarProdutos(req,res) {
    try{
        const produtos = await produtosModel.listarProdutos();
        res.status(200).json(produtos)
    }catch(erro){
        res.status(500).json(erro)

    }
    
}

async function cadastrarProdutos(req,res) {
    try{
        const {nome, quantidade, categoria} = req.body;

        const produto = await produtosModel.cadastrarProdutos(nome, quantidade, categoria)
       
        
        res.status(201).send(`<script>alert('Equipamento cadastrado') 
            window.location.href = 'http://127.0.0.1:5501/public/login.html';</script>`)}
    
    catch (erro){
        res.status(500).json(erro)
    }
    
}
module.exports = {listarProdutos, cadastrarProdutos}