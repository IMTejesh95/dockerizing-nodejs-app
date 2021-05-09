const express = require('express');
const mongoose = require('mongoose');


const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://mongo:27017/items',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Item = require('./models/item');


app.get('/', (req, res) => {
  res.send("Hello there!");
})

app.get('/items', (req, res) => {
  Item.find()
    .then(items => res.status(200).json(items))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});

app.post('/items', (req, res) => {
  console.log(req.body);
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.status(200).json(item));
});

const port = 3000;

app.listen(port, () => console.log('Server running...'));