const User = require("../models/user")

const userRoute = (app) => {
    app.post('/user', async (req, res) => {
        const { name, email,lists } = req.body

        const user = {
            name,
            email,
            lists
        }

        try {
            await User.create(user)

            res.status(201).json({ message: 'Usuario inserido no sistema com sucesso!' })
        } catch (error) {
            res.status(500).json({ error: error })
        }
    })
    app.get('/user', async (req, res) => {
        try {
            const user = await User.find()

            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({ erro: error })
        }
    })
}

module.exports = userRoute