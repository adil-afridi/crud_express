
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());

let items = [];

// Create - Add a new item
app.post('/items', (req, res) => {
    const item = req.body;
    item.id = Date.now();
    items.push(item);
    res.json(item);
});

// Read - Get all items
app.get('/items', (req, res) => {
    res.json(items);
});

// Update - Edit an item by id
app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const updatedItem = req.body;
    items = items.map(item => (item.id == id ? updatedItem : item));
    res.json(updatedItem);
});


// Delete - Remove an item by id
app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    items = items.filter(item => item.id != id);
    res.json({ message: 'Item deleted' });
});




// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
