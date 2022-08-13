const {query} = require('./db')

exports.listOrg = async (event) => {

}
exports.getOrg = async (event) => {
    
}
exports.addOrg = async (event) => {
//  Creates the organisation and initial user as Admin
const orgRes = await query("select * from Users")
const userRes = await query("")
let response = {
  statusCode: 200,
  body : JSON.stringify({result: [orgRes,userRes]})
}
return response;
}

exports.editOrg = async (event) => {
    
}
