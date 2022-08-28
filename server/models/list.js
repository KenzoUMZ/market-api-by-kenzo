const mongoose = require('mongoose')

const List = mongoose.model('List', {
    name:String,
    products: Array,
    total: Number,
    userId: String,
})

module.exports = List