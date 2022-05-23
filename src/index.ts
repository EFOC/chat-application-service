import 'dotenv/config'
import express, { Express } from 'express'
import JsonWebToken from 'jsonwebtoken'
import { User } from './models/User'
import Logger from 'loglevel'
import { MySqlStore } from './database/stores/MySqlStore'

class Index {
    private app: Express
    private PORT = process.env.PORT || 3000

    constructor() {
        this.app = express()
        this.app.use(express.json())
        this.openRoutes()
        
    }

    private openRoutes(): void {

        // const mysql = new MySqlStore()
        this.app.get('/posts', this.authenticateToken, (req: express.Request, res: express.Response) => {
            Logger.debug('posts hit')
            // res.sendStatus(200)
        })
        
        this.app.post('/addUser', (req, res) => {
            Logger.warn('test')
            // console.log(req.body, logger)
            // TODO: make function add user
        })

        // Use as example for JWT
        // this.app.post('/login', (req, res) => {
        //     // Authenticate User in MySQL database
        
        //     const username = req.body.username
        //     const user = new User(username)
        //     const accessToken = this.generateAccessToken(user)
        //     const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET!!)
        //     const refreshTokens = {
        //         accessToken,
        //         refreshToken
        //     }
        //     console.log("tokens", refreshTokens)
        //     res.json({ accessToken, refreshToken })
        // })
        
    }

    private authenticateToken(req: express.Request, res: express.Response, next: express.NextFunction): void {
        console.log('auth hit from here')
        const authHeader = req.headers['authorization']
        const token: string = (authHeader ? authHeader.split(' ')[1] : '')
        if (token == null) {
            res.status(401).send('Forbidden')
            return
        } else {
            JsonWebToken.verify(token, process.env.ACCESS_TOKEN_SECRET!!.toString(), (err, user) => {
                if (err) return
                console.log('in verify user', user)
                // if (err) return res.sendStatus(403)
                // req.user = user
                next()
            })
        }
    }

    private generateAccessToken(user: User): string {
        return JsonWebToken.sign(user, process.env.ACCESS_TOKEN_SECRET!!, { expiresIn: '15s' })
    }

    public startServer(): void {
        this.app.listen(this.PORT, () => {
            console.log(`Listening at port ${this.PORT}`)
        })
    }
}

const index = new Index()
index.startServer()
