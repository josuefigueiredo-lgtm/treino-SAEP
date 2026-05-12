const usuarioModel = require('../model/usuariosModel');


async function login(req,res) {
    try{
        const {matricula} = req.body;
        const usuario = await usuarioModel.login(matricula);
        
        if (usuario.length == 0){
           return res.send(`
                <script>
                    alert('Matrícula não encontrada');
                    window.location.href = 'http://127.0.0.1:5501/public/index.html';
                </script>
            `)

        } else {
            const nome = usuario[0].nome;
        return res.send(`
            <script>
                alert('Login realizado');

                window.location.href = 'http://127.0.0.1:5501/public/login.html?nome=${nome}';
            </script>
        `)}
        
    } catch(erro){
        res.status(500).json(erro)
    }
    
}



module.exports = {login}