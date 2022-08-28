const mongoose = require('mongoose')

const Market = mongoose.model('Market', {
    name: String,
    cnpj: String,
    location: Map,
    products: Map,
    thumbnail: String,
})

module.exports = Market