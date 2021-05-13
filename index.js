const express = require('express');
const mongoose = require('mongoose');
const os = require('os');

const app = express();
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(
    `mongodb://${process.env.DB_SERVER}:27017/${process.env.DB_NAME}`,
    { useNewUrlParser: true }
  )
  .then(() => console.log('Database Connected'))
  .catch(err => console.log(err));

const Item = require('./models/item');


// Welcome Page
app.get('/', (req, res) => {
  var message = `Welcome to demo express-app hosted on ${os.hostname()}.`;
  res.render('pages/index', {message:message});
})


// Items Routes
// List Items
app.get('/items', (req, res) => {
  Item.find()
    .then(items => res.status(200).json(items))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});

// Get item by Id
app.get('/items/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => res.status(200).json(item))
    .catch(err => res.status(404).json({ msg: 'Not found' }));
});

// Create new item
app.post('/items', (req, res) => {
  console.log(req.body);
  const newItem = new Item({
    name: req.body.name
  });
  newItem.save().then(item => res.status(200).json(item));
});


// Update item by Id
app.put('/items/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => { 
      item.name = req.body.name;
      item.save();
      res.status(200).json(item)
    })
    .catch(err => res.status(404).json({ msg: 'Not Found' }));
});


// Delete item by Id
app.delete('/items/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => { 
      item.remove();
      res.status(204).json({'msg': 'removed'});
    })
    .catch(err => res.status(404).json({ msg: 'Not Found' }));
});




const port = 3000;

app.listen(port, () => console.log('Server listning on port '+ port));
