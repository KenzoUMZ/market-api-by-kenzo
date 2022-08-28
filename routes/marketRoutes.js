const Market = require("../models/market")

const marketRoute = (app) => {
    app.post('/market', async (req, res) => {
        const { name, cnpj,location,products } = req.body

        const market = {
            name,
            cnpj,
            location,
            products
        }

        try {
            await Market.create(market)

            res.status(201).json({ message: 'Mercado inserido no sistema com sucesso!' })
        } catch (error) {
            res.status(500).json({ error: error })
        }
    })
    app.get('/market', async (req, res) => {
        try {
            const market = await Market.find()

            res.status(200).json(market)
        } catch (error) {
            res.status(500).json({ erro: error })
        }
    })

    app.get('/market/id', async (req, res) => {
        try {
            const market = await Market.findOne(id)

            res.status(200).json(market)
        } catch (error) {
            res.status(500).json({ erro: error })
        }
    })
  
}

module.exports = marketRoute