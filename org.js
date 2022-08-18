
const {query} = require('./db')

exports.listOrg = async (event) => {

}
exports.getOrg = async (event) => {
    
}
exports.addOrg = async (event) => {
//  Creates the organisation and initial user as Admin
//  Validate the user isn't the AdminUser of an existing organisation
let e = JSON.parse(event.body)
e.businessName = e.businessName.replace("'","")
console.log(e);
console.log(`INSERT INTO Organisation VALUES ('${e.businessName}','${e.serviceType}','${e.staffLimit}','${e.uid}')`);
const res = await query(`INSERT INTO Organisation VALUES ('${e.businessName}','${e.serviceType}','${e.staffLimit}','${e.uid}')`)
 await query (`UPDATE Users SET FirstName = '${e.fname}' and LastName = '${e.sname}'`)
return {
  statusCode: 200,
  status:200,
  message: 'Created new organisation',
  body : JSON.stringify(res)
}
}

exports.editOrg = async (event) => {
    
}
