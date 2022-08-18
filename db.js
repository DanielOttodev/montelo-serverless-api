
const sql = require('mssql')
const {config} = require('./config')

exports.query = async (query) => {
      // Close the connection
      try {
        let conn = await sql.connect(config)
        const result = await sql.query(query)
        console.log('Success')
        conn.close()
          

        sql.on('error', err => {
          // ... error handler 
          console.log("Sql database connection error ", err);
          conn.close()
          console.log('ERROR:', err)
          return err
        })
        return JSON.stringify(result);
      } catch (error) {
        console.log('ERROR:' ,error);
        return error
      }

}
