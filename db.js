const sql = require('mssql')
const {config} = require('./config')

exports.query = async (query) => {
      // Close the connection
  let conn = await sql.connect(config)
  const result = await sql.query(query)
  console.log('Success')
  
  conn.close()
    
  sql.on('error', err => {
    // ... error handler 
    console.log("Sql database connection error ", err);
    conn.close()
    return err
  })

  return JSON.stringify(result);
}
