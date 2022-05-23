"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySqlDatabase = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
class MySqlDatabase {
    constructor() {
        this.connection = mysql2_1.default.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'MySql1234!'
        });
        this.connection.connect((err) => {
            if (err)
                console.log("database connecting error", err);
            console.log("MySql connected!");
        });
    }
    executeSql(query) {
        this.connection.query(query, function (err, result) {
            console.log("executing");
            if (err) {
                console.log('error', err);
                return;
            }
            console.log('result', result);
        });
    }
}
exports.MySqlDatabase = MySqlDatabase;
