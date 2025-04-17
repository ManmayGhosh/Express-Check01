import express, { json } from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());
let teaData = [];
let nextId = 1;

app.post('/do', (req, res) => {
    const { name,price } = req.body;
    const newDo = {id:nextId, name, price};
    teaData.push(newDo);
    nextId++;
    res.status(201).send(newDo);
});

app.get('/do', (req, res) => {
    res.status(201).send(teaData);
});

app.get('/do/:id', (req, res) => {
    const { id } = req.params;
    const doItem = teaData.find(item => item.id === parseInt(id));
    if (!doItem) {
        return res.status(404).send('Do not found');
    }
    res.status(200).send(doItem);
});

app.put('/do/:id', (req, res) => {
    const doItem = teaData.find(item => item.id === parseInt(req.params.id));
    const { name, price } = req.body;
    if (!doItem) {
        return res.status(404).send('Do not found');
    }
    doItem.name = name;
    doItem.price = price;
    res.status(200).send(doItem);
});


app.delete('/do/:id', (req, res) => {
    const doItemIndex = teaData.findIndex(item => item.id === parseInt( req.params.id));
    if (doItemIndex === -1) {
        return res.status(404).send('Do not found');
    }
    teaData.splice(doItemIndex, 1);
    res.status(204).send('Deleted');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});