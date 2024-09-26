
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
