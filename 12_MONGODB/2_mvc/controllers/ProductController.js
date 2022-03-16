const product = require('../models/Product')

module.exports = class ProductController{

    static showproducts(req,res) {
        
        res.render('products/all')
    }
}
