const ProductType = require("../models/productType")



const productTypeRoute = (app) => {
    app.post('/productType', async (req, res) => {
        const { name, thumbnail } = req.body

        const category = {
            name,
            thumbnail
        }

        try {
            await ProductType.create(category)

            res.status(201).json({ message: 'Categoria inserida no sistema com sucesso!' })
        } catch (error) {
            res.status(500).json({ error: error })
        }
    })
    app.get('/productType', async (req, res) => {
        try {
            const list = await ProductType.find().collation({ locale: 'en', strength: 2 }).sort({ name: 1 }).then((list) =>
                res.status(200).json(list)
            );


        } catch (error) {
            res.status(500).json({ erro: error })
        }
    })
}

module.exports = productTypeRoute