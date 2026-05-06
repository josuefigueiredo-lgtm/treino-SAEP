CREATE DATABASE emprestimos;

USE emprestimos;

CREATE TABLE usuarios (
idUsuarios INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100),
telefone VARCHAR(11),
matricula VARCHAR(100)
);

CREATE TABLE equipamentos (
idEquipamentos INT PRIMARY KEY AUTO_INCREMENT,
nome TEXT,
quantidade INT,
categoria VARCHAR(45)
);


CREATE TABLE emprestimos (
idEmprestimos INT PRIMARY KEY AUTO_INCREMENT,
idEquipamentos INT,
idUsuarios INT,
dataInicio DATETIME,
dataDevolucao DATETIME,
foreign key (idEquipamentos) references equipamentos(idEquipamentos),
foreign key (idUsuarios) references usuarios(idUsuarios) 

);

INSERT INTO usuarios (nome, telefone, matricula) 
VALUES ("Joao", "77981216929", "2502"), ("Joao", "77981216929", "2502"),
("Joao", "77981216929", "2502");

INSERT INTO equipamentos (nome, quantidade, categoria) VALUES 
("Notebook", 10, "Eletricos"),("Notebook", 10, "Eletricos"),
("Notebook", 10, "Eletricos");


INSERT INTO emprestimos (idEquipamentos, idUsuarios, dataInicio, dataDevolucao)
VALUES (1,2,'2026-01-12', '2026-03-01');   