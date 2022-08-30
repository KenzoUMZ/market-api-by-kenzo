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

            const productType = await ProductType.find();


            res.status(200).json(productType);
        } catch (error) {
            res.status(500).json({ erro: error })
        }
    })
}

module.exports = productTypeRoute