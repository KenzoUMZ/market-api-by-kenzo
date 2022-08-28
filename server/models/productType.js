const mongoose = require('mongoose')

const ProductType = mongoose.model('ProductType', {
    name: String,
    thumbnail: String
})

module.exports = ProductType