const Product = require("../models/product")

const productRoute = (app) => {
    app.post('/products', async (req, res) => {
        const { name, type, description, unit, thumbnail, gtin } = req.body

        const product = {
            name,
            type,
            description,
            unit,
            thumbnail,
            gtin
        }

        try {
            await Product.create(product)

            res.status(201).json({ message: 'Produto inserido no sistema com sucesso!' })
        } catch (error) {
            res.status(500).json({ error: error })
        }
    })
    app.get('/products', async (req, res) => {
        try {
            const product = await Product.find()

            res.status(200).json(product)
        } catch (error) {
            res.status(500).json({ erro: error })
        }
    })

    app.get('/product/:type', async (req, res) => {
        const type = req.params.type;
        try {

            const product = await Product.find({ type: type });
            if (!product) {
                res.status(422).json({ message: 'Produto não encontrado!' })
                return
            }
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json({ erro: error })
        }
    })

    app.get('/products/:gtin', async (req, res) => {
        const gtin = req.params.gtin;
       
        try {
            const product = await Product.findOne({ gtin: gtin });
            if (!product) {
                res.message
                res.status(422).json({ message: 'Produto não encontrado!' })
                return res.message
            }
            res.status(200).json(product)
        } catch (error) {
            res.status(500).json({ erro: error })
        }
    })
}

module.exports = productRoute