import { User } from '../../models/User';
import { MySqlDatabase } from '../mysql/MySqlDatabase';

export class MySqlStore {

    mySqlDatabase: MySqlDatabase

    constructor() {
        this.mySqlDatabase = new MySqlDatabase()
    }

    public addUser(username: User) {
        const query = `INSERT INTO USER VALUES`
        this.mySqlDatabase.executeSql(query)
    }

    public findUser(username: string) {

    }
}
