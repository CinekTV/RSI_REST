import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(cors());

app.get('/api/user/:id', (req, res) => {
    const { id } = req.params;
    res.json({ resource: 'user', id });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
