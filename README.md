
# API de Itens - Node.js com Express

Este repositório contém o código fonte de um servidor Node.js utilizando o framework Express para gerenciar uma API de itens. A API permite a criação, leitura, atualização e exclusão de itens armazenados em um mapa de dados (chave-valor). A documentação da API é servida utilizando Swagger.

## Índice

- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Inicialização do Servidor](#inicialização-do-servidor)
- [Utilização](#utilização)
  - [GET /items](#get-items)
  - [GET /items/:id](#get-itemsid)
  - [POST /items](#post-items)
  - [PATCH /items/:id](#patch-itemsid)
  - [DELETE /items/:id](#delete-itemsid)
  - [OPTIONS /items](#options-items)
  - [OPTIONS /items/:id](#options-itemsid)
- [Documentação da API com Swagger](#documentação-da-api-com-swagger)

## Requisitos

- Node.js (v14 ou superior)
- npm (v6 ou superior)

## Instalação

Clone este repositório e instale as dependências:

```bash
git clone https://github.com/vagnnermartins/UTFP-NodeExpress
cd UTFP-NodeExpress
npm install
```

## Inicialização do Servidor

Certifique-se de que você tenha um arquivo `index.js` com o conteúdo descrito anteriormente. Para iniciar o servidor, execute o seguinte comando no terminal:

```bash
node index.js
```

O servidor será iniciado e estará disponível em `http://localhost:3000`.

## Utilização

### GET /items

Retorna todos os itens armazenados.

- **URL:** `/items`
- **Método:** `GET`
- **Resposta:** `200 OK`
- **Exemplo de Resposta:**

```json
[
    {
        "id": "1",
        "value": { "name": "Item 1", "description": "Descrição do Item 1" }
    },
    {
        "id": "2",
        "value": { "name": "Item 2", "description": "Descrição do Item 2" }
    }
]
```

### GET /items/:id

Retorna um item específico com base no ID.

- **URL:** `/items/:id`
- **Método:** `GET`
- **Resposta:** `200 OK` ou `404 Not Found`
- **Exemplo de Resposta:**

```json
{
    "id": "1",
    "value": { "name": "Item 1", "description": "Descrição do Item 1" }
}
```

### POST /items

Adiciona um novo item ou múltiplos itens ao servidor.

- **URL:** `/items`
- **Método:** `POST`
- **Body:** JSON com `id` e `value`
- **Resposta:** `201 Created` ou `400 Bad Request`
- **Exemplo de Requisição:**

```json
{
    "id": "3",
    "value": { "name": "Item 3", "description": "Descrição do Item 3" }
}
```

### PATCH /items/:id

Atualiza um item existente com base no ID.

- **URL:** `/items/:id`
- **Método:** `PATCH`
- **Body:** JSON com os dados atualizados
- **Resposta:** `201 Created` ou `404 Not Found`
- **Exemplo de Requisição:**

```json
{
    "name": "Item 3 Atualizado",
    "description": "Descrição atualizada"
}
```

### DELETE /items/:id

Deleta um item com base no ID.

- **URL:** `/items/:id`
- **Método:** `DELETE`
- **Resposta:** `200 OK` ou `404 Not Found`
- **Exemplo de Resposta:**

```json
{
    "message": "Item deletado com sucesso"
}
```

### OPTIONS /items

Retorna os métodos permitidos para a rota `/items`.

- **URL:** `/items`
- **Método:** `OPTIONS`
- **Resposta:** `200 OK`

### OPTIONS /items/:id

Retorna os métodos permitidos para a rota `/items/:id`.

- **URL:** `/items/:id`
- **Método:** `OPTIONS`
- **Resposta:** `200 OK`

## Documentação da API com Swagger

A documentação da API pode ser acessada através do Swagger na seguinte URL:

- [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

Aqui, você encontrará uma interface interativa para testar os endpoints da API e visualizar suas descrições detalhadas.

---

Esse `README` fornece uma descrição completa sobre como configurar, iniciar e utilizar os endpoints da API, incluindo a documentação com Swagger.
