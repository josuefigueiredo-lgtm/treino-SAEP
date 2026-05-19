const express = require('express')
const router = express.Router();
const equipamentoController = require('../Controller/equipamentoController')

router.get('/', equipamentoController.listarEquipamentos)
router.post('/', equipamentoController.cadastroEquipamentos)
router.put('/:id', equipamentoController.atualizarEquipamentos)
router.delete('/:id', equipamentoController.deletarEquipamentos)

module.exports = router;