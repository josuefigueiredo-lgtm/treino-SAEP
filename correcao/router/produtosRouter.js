const express = require('express')
const router = express.Router();
const produtoController = require('../controllers/produtoController')


router.get('/', produtoController.listarProdutos);
router.post('/', produtoController.cadastrarProdutos)
router.put('/:id', produtoController.atualizarProdutos)
router.delete('/:id', produtoController.deletarPedidos)





module.exports = router