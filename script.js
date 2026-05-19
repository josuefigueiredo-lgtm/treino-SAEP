async function login() {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    
    const resposta = await fetch("http://localhost:3000/usuarios",
        {
            method: "POST",
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                senha: senha
            })

    });
    const dados = await resposta.json()
    console.log(dados);
    
}