const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const port = 3000;

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API de Itens',
        version: '1.0.0',
        description: 'API para gerenciar um mapa de dados (chave-valor).',
    },
    servers: [
        {
            url: `http://localhost:${port}`,
            description: 'Servidor local',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./index.js'], // Caminho do arquivo onde estão as anotações Swagger
};

const swaggerSpec = swaggerJsdoc(options);

// Middleware para servir a documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Usar o middleware para fazer parse do JSON no corpo das requisições
app.use(express.json());

// HashMap para armazenar dados (chave-valor)
const dataMap = new Map();

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Retorna todos os itens
 *     responses:
 *       200:
 *         description: Lista de itens.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   value:
 *                     type: object
 */
app.get('/items', (req, res) => {
    console.log("GET /items")
    const xDataLatitude = req.headers['x-data-latitude'];
    const xDataLongitude = req.headers['x-data-longitude'];
    console.log(`x-data-Latitude: ${xDataLatitude} x-data-Longitude ${xDataLongitude}`);
    const items = Array.from(dataMap, ([id, value]) => ({ id, value }));
    res.json(items);
});

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Retorna um item específico pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do item
 *     responses:
 *       200:
 *         description: Item encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 value:
 *                   type: object
 *       404:
 *         description: Item não encontrado.
 */
app.get('/items/:id', (req, res) => {
    const id = req.params.id;
    console.log(`GET /items/${id}`)
    const xDataLatitude = req.headers['x-data-latitude'];
    const xDataLongitude = req.headers['x-data-longitude'];
    console.log(`x-data-Latitude: ${xDataLatitude} x-data-Longitude ${xDataLongitude}`);
    if (dataMap.has(id)) {
        res.json({ id, value: dataMap.get(id) });
    } else {
        res.status(404).json({ error: 'Item não encontrado' });
    }
});

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Adiciona novos itens
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             oneOf:
 *               - type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     value:
 *                       type: object
 *               - type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   value:
 *                     type: object
 *     responses:
 *       201:
 *         description: Itens adicionados.
 *       400:
 *         description: Erro ao adicionar itens.
 */
app.post('/items', (req, res) => {
    console.log("POST /items");
    const xDataLatitude = req.headers['x-data-latitude'];
    const xDataLongitude = req.headers['x-data-longitude'];
    console.log(`x-data-Latitude: ${xDataLatitude} x-data-Longitude ${xDataLongitude}`);
    const body = req.body;

    // Verifica se body é um array ou um único objeto
    if (Array.isArray(body)) {
        // Se for um array, percorre os itens e adiciona ao dataMap
        const addedItems = [];
        const errors = [];

        for (const item of body) {
            const id = item.id;
            if (dataMap.has(id)) {
                errors.push({ id, error: 'ID já existe' });
            } else {
                dataMap.set(id, item);
                addedItems.push(item);
            }
        }

        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        return res.status(201).json(addedItems);
    } else {
        // Se for um único objeto, processa como antes
        const id = body.id;
        if (dataMap.has(id)) {
            return res.status(400).json({ error: 'ID já existe' });
        }
        dataMap.set(id, body);
        return res.status(201).json(body);
    }
});


/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Deleta um item pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do item
 *     responses:
 *       200:
 *         description: Item deletado com sucesso.
 *       404:
 *         description: Item não encontrado.
 */
app.delete('/items/:id', (req, res) => {
    const id = req.params.id;
    console.log(`DELETE /items/${id}`)
    const xDataLatitude = req.headers['x-data-latitude'];
    const xDataLongitude = req.headers['x-data-longitude'];
    console.log(`x-data-Latitude: ${xDataLatitude} x-data-Longitude ${xDataLongitude}`);
    if (dataMap.has(id)) {
        dataMap.delete(id);
        res.json({ message: 'Item deletado com sucesso' });
    } else {
        res.status(404).json({ error: 'Item não encontrado' });
    }
});

/**
 * @swagger
 * /items/{id}:
 *   patch:
 *     summary: Atualiza um item pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Item atualizado com sucesso.
 *       404:
 *         description: Item não encontrado.
 */
app.patch('/items/:id', (req, res) => {
    const id = req.params.id;
    const updates = req.body;

    console.log(`PATCH /items/${id}`);

    const xDataLatitude = req.headers['x-data-latitude'];
    const xDataLongitude = req.headers['x-data-longitude'];
    console.log(`x-data-Latitude: ${xDataLatitude} x-data-Longitude ${xDataLongitude}`);

    if (dataMap.has(id)) {
        const existingItem = dataMap.get(id);
        const updatedItem = { ...existingItem, ...updates }; // faz o merge dos campos
        dataMap.set(id, updatedItem);
        res.status(200).json(updatedItem);
    } else {
        res.status(404).json({ error: 'Item não encontrado' });
    }
});

/**
 * @swagger
 * /items:
 *   options:
 *     summary: Retorna os métodos permitidos
 *     responses:
 *       200:
 *         description: Métodos permitidos.
 *         headers:
 *           Allow:
 *             schema:
 *               type: string
 */
app.options('/items', (req, res) => {
    res.set('Allow', 'GET, POST, OPTIONS, DELETE, PATCH');
    res.sendStatus(200);
});

app.options('/items/:id', (req, res) => {
    res.set('Allow', 'GET, PATCH, PUT, DELETE, OPTIONS');
    res.sendStatus(200);
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
