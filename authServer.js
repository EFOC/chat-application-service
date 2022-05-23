require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
console.log("authServer Started")

const app = express()
app.listen(5000)
app.use(express.json())

let refreshTokens = []

app.post('/token', (req,res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)

    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        console.log('inside verify', user)
        const accessToken = generateAccessToken({ username: user.username })
        res.json({ accessToken })
    })

})

app.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    return res.sendStatus(204)
})

app.post('/login', (req, res) => {
    // Authenticate User

    const username = req.body.username
    const user = {
        username
    }
    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    console.log("tokens", refreshTokens)
    res.json({ accessToken, refreshToken })
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' })
}