const List = require("../models/list")
const Product = require("../models/product")

const listRoute = (app) => {
    app.post('/list', async (req, res) => {
        const { name, products, userEmail } = req.body

        const list = {
            name,
            products,
            userEmail
        }

        try {
            await List.create(list)

            res.status(201).json({ message: 'Lista inserida no sistema com sucesso!' })
        } catch (error) {
            res.status(500).json({ error: error })
        }
    })
    app.get('/list', async (req, res) => {
        try {
            const list = await List.find();

            res.status(200).json(list)
        } catch (error) {
            res.status(500).json({ erro: error })
        }
    })

    app.get('/list/:userEmail', async (req, res) => {
        const userEmail = req.params.userEmail;
        try {
            const list = await List.find({ userEmail: userEmail });
            if (!list) {
                res.status(422).json({ message: 'Lista não encontrada!' })
                return
            }
            res.status(200).json(list)
        } catch (error) {
            res.status(500).json({ erro: error })
        }
    })

    app.patch('/list/:userEmail/:productId', async (req, res) => {

        const userId = req.params.userId
        const productId = req.params.productId
        try {
            const list = await List.findOneAndUpdate({ userId: userId }, { $push: { products: productId } });

            if (!list) {
                res.status(422).json({ message: 'Lista não encontrada!' })
                return
            }
            res.status(200).json(list)
        } catch (error) {
            res.status(500).json({ erro: error })
        }
    });
}

module.exports = listRoute