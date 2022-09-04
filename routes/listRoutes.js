const List = require("../models/list")
const Product = require("../models/product")

const listRoute = (app) => {
    app.post('/list', async (req, res) => {
        const { name, description, products, userEmail } = req.body

        const list = {
            name,
            description,
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

    app.get('/list', async (req, res) => {
        const { name, userEmail } = req.body;
        const data = { name, userEmail };
        const list = await List.findOne({ name: data.name, userEmail: data.userEmail });

        if (!list) {
            res.status(422).json({ message: 'Lista não encontrada' });
            return
        }
        try {
            res.status(200).json(list);
        } catch (error) {
            res.status(500).json({ error: error })
        }
    });

    app.patch('/list', async (req, res) => {

        const { name, userEmail, gtin } = req.body;

        const data = { name, userEmail, gtin };

        try {
            const list = await List.findOneAndUpdate({ name: data.name, userEmail: data.userEmail },
                { $push: { products: data.gtin } });

            if (!list) {
                res.status(422).json({ message: 'Lista não encontrada!' })
                return
            }
            res.status(200).json(list)
        } catch (error) {
            res.status(500).json({ erro: error })
        }
    });

    app.delete('/list', async (req, res) => {
        const { name, userEmail } = req.body;
        const data = { name, userEmail };
        const list = await List.findOne({ name: data.name, userEmail: data.userEmail });

        if (!list) {
            res.status(422).json({ message: 'Lista não encontrada' });
            return
        }
        try {

            await List.deleteOne({ name: name, userEmail: userEmail });
            res.status(200).json({ message: 'Lista removida com sucesso!' });
        } catch (error) {
            res.status(500).json({ error: error })
        }
    });
}

module.exports = listRoute