import 'dotenv/config'
import MySql from 'mysql2'

export class MySqlDatabase {

    private connection: MySql.Connection

    constructor() {
        this.connection = MySql.createConnection({
            host: process.env.HOST,
            user: process.env.USER,
            password: process.env.DATABASE_PASSWORD
        })

        this.connection.connect((err) => {
            if (err) console.log("database connecting error", err)
            console.log("MySql connected!")
        })
       
    }

    public executeSql(query: string) {
        this.connection.query(query, function(err, result) {
            console.log("executing")
            if (err) {
                    console.log('error', err)
                    return
                }
            console.log('result', result)
        })
    }
}
