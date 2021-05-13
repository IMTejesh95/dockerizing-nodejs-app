const express = require('express');



function routes(Item) {
    const itemRouter = express.Router();

    itemRouter.route('/items')
        .get((req, res) => {
            Item.find()
                .then(items => res.status(200).json(items))
                .catch(err => res.status(404).json({ msg: 'No items found' }));
        })
        .post((req, res) => {
            const newItem = new Item({
                name: req.body.name
            });
            newItem.save().then(item => res.status(200).json(item));
        });

    itemRouter.route('/items/:id')
        .put((req, res) => {
            Item.findById(req.params.id)
                .then(item => {
                    item.name = req.body.name;
                    item.save();
                    res.status(200).json(item)
                })
                .catch(err => res.status(404).json({ msg: 'Not Found' }));
        })
        .get((req, res) => {
            Item.findById(req.params.id)
                .then(item => res.status(200).json(item))
                .catch(err => res.status(404).json({ msg: 'Not found' }));
        })
        .delete((req, res) => {
            Item.findById(req.params.id)
                .then(item => {
                    item.remove();
                    res.status(204).json({ 'msg': 'removed' });
                })
                .catch(err => res.status(404).json({ msg: 'Not Found' }));
        });

    return itemRouter;

}



module.exports = routes;