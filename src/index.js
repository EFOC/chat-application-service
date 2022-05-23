"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loglevel_1 = __importDefault(require("loglevel"));
class Index {
    constructor() {
        this.PORT = process.env.PORT || 3000;
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json());
        this.openRoutes();
    }
    openRoutes() {
        // const mysql = new MySqlStore()
        this.app.get('/posts', this.authenticateToken, (req, res) => {
            loglevel_1.default.debug('posts hit');
            // res.sendStatus(200)
        });
        this.app.post('/addUser', (req, res) => {
            loglevel_1.default.warn('test');
            // console.log(req.body, logger)
            // TODO: make function add user
        });
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
    authenticateToken(req, res, next) {
        console.log('auth hit from here');
        const authHeader = req.headers['authorization'];
        const token = (authHeader ? authHeader.split(' ')[1] : '');
        if (token == null) {
            res.status(401).send('Forbidden');
            return;
        }
        else {
            jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET.toString(), (err, user) => {
                if (err)
                    return;
                console.log('in verify user', user);
                // if (err) return res.sendStatus(403)
                // req.user = user
                next();
            });
        }
    }
    generateAccessToken(user) {
        return jsonwebtoken_1.default.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15s' });
    }
    startServer() {
        this.app.listen(this.PORT, () => {
            console.log(`Listening at port ${this.PORT}`);
        });
    }
}
const index = new Index();
index.startServer();
