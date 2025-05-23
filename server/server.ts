import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 4000;

app.use(cors());

app.get('/api/:resource/:id', (req, res) => {
    const { resource, id } = req.params;
    res.json({ resource, id });
});
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

app.get('/api/xml', (req, res) => {
    const messages = [
        { id: 1, content: 'Hello' },
        { id: 2, content: 'World' }
    ];

    const xml = `
    <messages>
      ${messages.map(m => `
        <message>
          <id>${m.id}</id>
          <content>${m.content}</content>
        </message>`).join('')}
    </messages>
  `.trim();

    res.set('Content-Type', 'application/xml');
    res.send(xml);
});