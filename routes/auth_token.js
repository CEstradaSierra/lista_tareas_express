const express = require("express")
const jose = require("jose")
const authByEmailPwd = require("../helpers/auth-by-email-pwd")
const USERS_BBDD = require("../bbdd")
const authTokenRouter = express.Router()
require('dotenv').config()

authTokenRouter.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const user = authByEmailPwd(email, password)
        const { guid } = user
        //generador de token 
        const jwtConstructor = new jose.SignJWT({ guid })

        //codificar el secreto 
        const encoder = new TextEncoder();
        const jwt = await jwtConstructor
            .setProtectedHeader({ alg: 'HS256', type: 'JWT' })
            .setIssuedAt()
            .setExpirationTime("1h")
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY))


        return res.send({ jwt })
    } catch (err) {
        console.log(err)
        return res.sendStatus(401)
    }
})

authTokenRouter.get('/profile', async (req, res) => {
    const { authorization } = req.headers

    if (!authorization) return res.sendStatus(401)

    try {
        const encoder = new TextEncoder()
        const { payload } = await jose.jwtVerify(
            authorization,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        )

        const user = USERS_BBDD.find(u => u.guid === payload.guid)

        if (!user) return res.sendStatus(401)

        delete user.password

        return res.send(user)
    } catch (err) {
        return res.sendStatus(401)
    }
})
module.exports = authTokenRouter