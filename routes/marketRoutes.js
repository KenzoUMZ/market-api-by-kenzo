const Market = require("../models/market")

const marketRoute = (app) => {
    app.post('/market', async (req, res) => {
        const { name, cnpj, location, products, thumbnail } = req.body

        const market = {
            name,
            cnpj,
            location,
            products,
            thumbnail
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

    app.patch('/market/price', async (req, res) => {

        const { cnpj, gtin, value } = req.body;

        const data = { cnpj, gtin, value };
    
        try {
            const market = await Market.findOneAndUpdate({cnpj: data.cnpj},
                { $set: {[`products.${data.gtin}`]: String(data.value)} });

            if (!market) {
                res.status(422).json({ message: 'Mercado não encontrado!' })
                return
            }
            res.status(200).json(market)
        } catch (error) {
            res.status(500).json({ error: error })
        }
    });

}

module.exports = marketRoute