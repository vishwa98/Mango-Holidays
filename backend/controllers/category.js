const Category = require('../models/category');



exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: 'Error'
            });
        }
        req.category = category;
        next();
    });
};


exports.create = (req, res) => {
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'Error'
            });
        }
        res.json({ data });
    });
};


exports.read = (req, res) => {
    return res.json(req.category);
};


exports.list = (req, res) => {
    console.log("CALLED");
    Category.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'Errorr'
            });
        }
        console.log(data);
        res.json(data);
    });
};