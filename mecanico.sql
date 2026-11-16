DROP DATABASE IF EXISTS oficina_mecanica;
CREATE DATABASE oficina_mecanica
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE oficina_mecanica;

-- -----------------------------------------------------
-- Tabela: usuarios (quem faz login no sistema)
-- -----------------------------------------------------
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome       VARCHAR(100) NOT NULL,
    email      VARCHAR(120) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    criado_em  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- Tabela: clientes
-- CPF armazenado CRIPTOGRAFADO (VARBINARY, AES)
-- -----------------------------------------------------
CREATE TABLE clientes (
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome       VARCHAR(100) NOT NULL,
    cpf        VARBINARY(255) NOT NULL UNIQUE,
    telefone   VARCHAR(20),
    email      VARCHAR(120),
    criado_em  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------
-- Tabela: veiculos (todo veículo pertence a um cliente)
-- -----------------------------------------------------
CREATE TABLE veiculos (
    id_veiculo INT AUTO_INCREMENT PRIMARY KEY,
    placa      VARCHAR(8)  NOT NULL UNIQUE,
    marca      VARCHAR(50) NOT NULL,
    modelo     VARCHAR(50) NOT NULL,
    ano        SMALLINT    NOT NULL,
    cor        VARCHAR(30),
    id_cliente INT NOT NULL,
    CONSTRAINT fk_veiculo_cliente
        FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);

-- -----------------------------------------------------
-- Tabela: servicos (catálogo de serviços da oficina)
-- -----------------------------------------------------
CREATE TABLE servicos (
    id_servico     INT AUTO_INCREMENT PRIMARY KEY,
    descricao      VARCHAR(100) NOT NULL,
    valor          DECIMAL(10,2) NOT NULL,
    duracao_minutos INT NOT NULL
);

-- -----------------------------------------------------
-- Tabela: agendamentos
-- -----------------------------------------------------
CREATE TABLE agendamentos (
    id_agendamento   INT AUTO_INCREMENT PRIMARY KEY,
    data_agendamento DATETIME NOT NULL,
    status           ENUM('AGENDADO','EM_ANDAMENTO','CONCLUIDO','CANCELADO')
                     NOT NULL DEFAULT 'AGENDADO',
    observacoes      VARCHAR(255),
    id_veiculo       INT NOT NULL,
    id_servico       INT NOT NULL,
    id_usuario       INT NOT NULL,
    CONSTRAINT fk_agend_veiculo FOREIGN KEY (id_veiculo) REFERENCES veiculos(id_veiculo),
    CONSTRAINT fk_agend_servico FOREIGN KEY (id_servico) REFERENCES servicos(id_servico),
    CONSTRAINT fk_agend_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    -- evita dois agendamentos do mesmo veículo no mesmo horário (duplicidade)
    CONSTRAINT uq_veiculo_horario UNIQUE (id_veiculo, data_agendamento)
);

-- =====================================================
-- DADOS (mínimo de 3 registros por tabela)
-- Senha dos usuários de teste: 123456 (hash SHA-256)
-- Chave de criptografia do CPF de exemplo: 'chave_oficina_2026'
-- (em produção, a chave deve ficar em variável de ambiente, não no código)
-- =====================================================

INSERT INTO usuarios (nome, email, senha_hash) VALUES
('Carlos Mendes',  'carlos@oficina.com',  SHA2('123456', 256)),
('Fernanda Lima',  'fernanda@oficina.com', SHA2('123456', 256)),
('Roberto Alves',  'roberto@oficina.com', SHA2('123456', 256));

INSERT INTO clientes (nome, cpf, telefone, email) VALUES
('João Pereira',  AES_ENCRYPT('111.444.777-35', 'chave_oficina_2026'), '(77) 99911-2233', 'joao@email.com'),
('Maria Souza',   AES_ENCRYPT('529.982.247-25', 'chave_oficina_2026'), '(77) 99822-3344', 'maria@email.com'),
('Pedro Santos',  AES_ENCRYPT('935.411.347-80', 'chave_oficina_2026'), '(77) 99733-4455', 'pedro@email.com');

INSERT INTO veiculos (placa, marca, modelo, ano, cor, id_cliente) VALUES
('ABC1D23', 'Fiat',       'Uno',     2015, 'Branco', 1),
('QWE4R56', 'Volkswagen', 'Gol',     2018, 'Prata',  2),
('JKL7M89', 'Chevrolet',  'Onix',    2021, 'Preto',  3),
('MNO2P34', 'Honda',      'Civic',   2019, 'Cinza',  1);

INSERT INTO servicos (descricao, valor, duracao_minutos) VALUES
('Troca de óleo e filtro',     180.00,  45),
('Alinhamento e balanceamento', 120.00,  60),
('Revisão de freios',          350.00, 120);

INSERT INTO agendamentos (data_agendamento, status, observacoes, id_veiculo, id_servico, id_usuario) VALUES
('2026-11-18 08:00:00', 'AGENDADO', 'Cliente pediu óleo sintético', 1, 1, 1),
('2026-11-17 14:30:00', 'AGENDADO', NULL,                           2, 2, 2),
('2026-11-19 10:00:00', 'AGENDADO', 'Barulho ao frear',             3, 3, 3);

-- =====================================================
-- CONSULTAS QUE O SISTEMA VAI USAR
-- =====================================================

-- Login (a senha é comparada pelo hash)
-- SELECT id_usuario, nome FROM usuarios WHERE email = ? AND senha_hash = SHA2(?, 256);

-- Busca de clientes (CPF descriptografado só para exibir/pesquisar)
-- SELECT id_cliente, nome,
--        CAST(AES_DECRYPT(cpf, 'chave_oficina_2026') AS CHAR) AS cpf,
--        telefone, email
-- FROM clientes
-- WHERE nome LIKE CONCAT('%', ?, '%')
--    OR CAST(AES_DECRYPT(cpf, 'chave_oficina_2026') AS CHAR) LIKE CONCAT('%', ?, '%');

-- Editar cliente
-- UPDATE clientes SET nome = ?, telefone = ?, email = ? WHERE id_cliente = ?;

-- Listagem de agendamentos ordenada por data, com dados do cliente e do veículo
-- SELECT a.id_agendamento, a.data_agendamento, a.status, a.observacoes,
--        c.nome AS cliente,
--        CAST(AES_DECRYPT(c.cpf, 'chave_oficina_2026') AS CHAR) AS cpf,
--        c.telefone, c.email,
--        v.placa, v.marca, v.modelo, v.ano, v.cor,
--        s.descricao AS servico, s.valor
-- FROM agendamentos a
-- JOIN veiculos v ON v.id_veiculo = a.id_veiculo
-- JOIN clientes c ON c.id_cliente = v.id_cliente
-- JOIN servicos s ON s.id_servico = a.id_servico
-- ORDER BY a.data_agendamento;

-- Atualizar data do agendamento
-- UPDATE agendamentos SET data_agendamento = ? WHERE id_agendamento = ?;