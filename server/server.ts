import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';



const app = express();
const PORT = 4000;

const swaggerSpec = swaggerJsDoc({
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'REST API with TypeScript + Express',
            version: '1.0.0',
            description: 'Dokumentacja API',
        },
        servers: [
            {
                url: 'http://localhost:4000',
            },
        ],
    },
    apis: ['./server.ts'], // 👈 tutaj możesz też dać inne pliki z endpointami
});

// 👉 Endpoint z dokumentacją
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({
    extended: true
}));

type Product = { id: number, name: string, price: number };

// const users: { id: number; name: string }[] = [];
const products: Product[] = [
    {id: 1, name: "Laptop", price: 2000},
    {id: 2, name: "GPU", price: 1500},
    {id: 3, name: "CPU", price: 500},
    {id: 4, name: "Motherboard", price: 200},
    {id: 5, name: "Power Supply", price: 300},
];

const  users = [
    { id: 1, name: 'Jan' },
    { id: 2, name: 'Anna' }
];

type ProductSearch = { name?: string, minPrice?: number };

app.post('/api/products/search', (req, res) => {
    const { name, minPrice } = req.body;
    const results = products.filter(p =>
        (!name || p.name.includes(name)) &&
        (!minPrice || p.price >= minPrice)
    );
    res.json(results);
});



app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/users', (req, res) => {
    res.json(users);
});

app.get('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    if (user) res.json(user);
    else res.status(404).json({ error: 'Not found' });
});

app.post('/api/users', (req: Request, res: Response) => {
    const { name } = req.body;
    const newUser = { id: Date.now(), name };
    users.push(newUser);
    res.status(201).json(newUser);
});
app.put('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const user = users.find(u => u.id === id);
    if (user) {
        user.name = name;
        res.json(user);
    } else {
        res.status(404).json({ error: 'Not found' });
    }
});

app.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
        const deleted = users.splice(index, 1);
        res.json(deleted[0]);
    } else {
        res.status(404).json({ error: 'Not found' });
    }
});

app.listen(PORT, () => {
    console.log(`REST API listening on http://localhost:${PORT}`);
});
