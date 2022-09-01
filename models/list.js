const mongoose = require('mongoose')

const List = mongoose.model('List', {
    name:String,
    description: String,
    products: Array,
    userEmail: String,
})

module.exports = List