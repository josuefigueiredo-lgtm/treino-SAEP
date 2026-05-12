const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/usuarios', async (req,res)=>{
    
    try{
        const [dados] = await db.query('SELECT * FROM usuarios');
        res.status(200).json(dados);
    } catch(error){
        res.status(500).json(error);
    }
})

app.listen(3000, ()=>{
    console.log("Está rodando na porta 3000");
})