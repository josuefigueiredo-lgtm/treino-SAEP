# Sistema de pedidos

## Descrição
Sistema CRUD completo com front-end, responsável para gerenciar os pedidos de um restaurante. 

O sistema permite:
- Cadastrar pedidos - POST
- Visualizar pedidos - GET
- Buscar pedidos pelo id - Get:id
- Atualizar pedidos pelo id - PUT
- Deletar pedidos pelo id - DELETE

# Tecnologias utilizadas:

- Node.js (CRUD)
- Express (Rotas)
- MySQL (Banco de Dados)
- Javascript (Back-end)
- Nodemon (Instânciar)
- Cors (Rotas externas)
- HTML (Front-end)
- CSS (Front-end)

# Instalação

## Instalar dependências
```
npm install express cors mysql2 nodemon
```

# Estrutura do projeto
```
projeto/ 
│ 
├── Controllers/ 
│ └ pedidoControllers.js 
│ 
├── Model 
│ └ pedidoModel.js 
│ 
├── public 
│ └ atualizar.html 
│ └ cadastrar.html 
│ └ deletar.html 
│ └ index.html 
│ └ visualizar.html
│ 
├── Routes 
│ └ pedidoRoutes.js
├── banco.sql
├── db.js
├── readme.md 
├── server.js    
```

# Executar o projeto

```
nodemon server.js
ou 
node server.js
```
# Banco de Dados

```
CREATE DATABASE lanchonete;

USE lanchonete;

CREATE TABLE pedidos (
id INT AUTO_INCREMENT PRIMARY KEY,
cliente VARCHAR(100),
produto VARCHAR(100),
quantidade INT
);
```
# Rotas da API

## 1-  Listar pedidos - GET

```
http://localhost:3000/pedidos
```
### Exemplo de resposta

```
[{
    "id": 1,
    "cliente": "João",
    "produto": "Pizza",
    "quantidade": 1
}]
```

## 2- Listar pedido pelo id - GET

```
http://localhost:3000/pedidos/:id
```
### Exemplo de resposta

```
[{
    "id": 1,
    "cliente": "João",
    "produto": "Pizza",
    "quantidade": 1
}]
```

## 3- Cadastrar pedido - POST

```
http://localhost:3000/pedidos
```
### Exemplo de body

```
{
    "cliente": "João",
    "produto": "Pizza",
    "quantidade": 1
}
```
### Exemplo de resposta

```
{
    mensagem:"Pedido cadastrado"
}
```

## 4- Atualizar pedido - PUT

```
http://localhost:3000/pedidos/:id
```
### Exemplo de body

```
{
    "cliente": "João",
    "produto": "Pizza",
    "quantidade": 1
}
```
### Exemplo de resposta

```
{
    mensagem:"Pedido atualizado"
}
```

## 5- Deletar pedido - Delete

```
http://localhost:3000/pedidos/:id
```

### Exemplo de resposta

```
{
    mensagem:"Pedido deletado"
}
```

# Tratamento de erro

- Id inexistente
- Quantidade negativa
- Campos obrigatórios

### Exemplo de resposta

```
{
    mensagem:"Id inexistente"
}
```
# Teste API's

- Postman

# Desenvolvedor

- Josué Rodrigo Evangelista Figueirêdo
