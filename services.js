const {query} = require('./db')

exports.listService = async (event) => {
    console.log(event);
    const res = await query("select * from Service")
    let response = {
      statusCode: 200,
      body : res
    }
    return response; }
exports.getService = async (event) => {
    console.log(event);
    const res = await query(`select * from Service where serviceId = ${event.pathParameters.id}`)
    let response = {
      statusCode: 200,
      body : res
    }
    return response; 
}
exports.addService = async (event) => {
    console.log(event);
    const res = await query(`INSERT into Service VALUES ()`)
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
    const res = await query(`DELETE from Service where serviceId = var  and businessId = var `)
    let response = {
      statusCode: 200,
      body : res
    }
    return response; 
}