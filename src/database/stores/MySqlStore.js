"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySqlStore = void 0;
const MySqlDatabase_1 = require("../mysql/MySqlDatabase");
class MySqlStore {
    constructor() {
        this.mySqlDatabase = new MySqlDatabase_1.MySqlDatabase();
    }
    addUser(username) {
        const query = `INSERT INTO USER VALUES`;
        this.mySqlDatabase.executeSql(query);
    }
    findUser(username) {
    }
}
exports.MySqlStore = MySqlStore;
