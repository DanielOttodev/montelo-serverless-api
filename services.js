const {query} = require('./db')

exports.listService = async (event) => {
    console.log(event);
    const res = await query("select * from Services")
    let response = {
      statusCode: 200,
      body : res
    }
    return response; }
exports.getService = async (event) => {
    console.log(event);
    const res = await query(`select * from Services where serviceId = ${event.pathParameters.id}`)
    let response = {
      statusCode: 200,
      body : res
    }
    return response; 
}
exports.addService = async (event) => {
    console.log(event);
    const res = await query(`INSERT into Services VALUES ()`)
    let response = {
      statusCode: 200,
      body : res
    }
    return response; 
}
exports.editService = async (event) => {
    
}
exports.deleteService = async (event) => {
    console.log(event);
    const res = await query(`DELETE from Services where serviceId = var  and businessId = var `)
    let response = {
      statusCode: 200,
      body : res
    }
    return response; 
}