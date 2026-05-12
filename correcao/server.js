const express = require('express')
const cors = require('cors')
const db = require('./db.js')
const usuarioRouter = require('./router/usuarioRouter.js')
const produtosRouter = require('./router/produtosRouter.js')
const path = require('path');

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use('/login', usuarioRouter)
app.use('/produtos', produtosRouter)


app.listen(3000, ()=>{
    console.log('O login foi realizado')
})