const generateToken = require('../generateToken')
const User = require('../models/User')

exports.registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body

        let user = await User.findOne({ email })
        if (user) {
            return res.status(404).send({ success: false, message: 'User already exists' })
        }

        user = await User.create({
            name,
            email,
            password
        })
        const token = await generateToken(user._id)

        if(res.status(201)){
            res.json({
                success:true,
                _id: user._id,
                name: user.name,
                email: user.email,
                token:token
            })
        }

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

exports.authUser = async (req, res) => {
    try {

        const { email, password } = req.body
        const user = await User.findOne({ email }).select('+password')

        if (user && ((await user.matchPassword(password)))) {
            res.status(201).send({
                success: true,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            })
        }
        else {
            res.status(401);
            throw new Error("Wrong Email or Password");
        }


    } catch (error) {

        res.status(500).send({
            success: false,
            message: error.message,

        })

    }
}