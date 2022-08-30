const mongoose = require('mongoose')

const Product = mongoose.model('Product', {
    name: String,
    type: String,
    description: String,
    thumbnail: String,
    gtin: String
})

module.exports = Product