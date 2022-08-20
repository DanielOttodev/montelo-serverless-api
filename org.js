
const {query} = require('./db')

exports.listOrg = async (event) => {

}
exports.getOrg = async (event) => {
console.log(event);
const res = await query(`SELECT OrgId from Users where Uid = '${event.pathParameters.id}'`)
return {
  statusCode: 200,
  status:200,
  body : JSON.stringify(res)
}
}
exports.addOrg = async (event) => {
//  Creates the organisation and initial user as Admin
//  Validate the user isn't the AdminUser of an existing organisation
let e = JSON.parse(event.body)
e.businessName = e.businessName.replace("'","")
console.log(e);

const createOrg = await query(`INSERT INTO Organisation VALUES ('${e.businessName}','${e.serviceType}','${e.staffLimit}','${e.uid}')`)
const getOrg = await query('select top 1  OrgId from Organisation order by orgid desc ')
const json = JSON.parse(getOrg);
console.log(json);
let org = json.res.recordset[0].OrgId
const userResponse = await query(`INSERT INTO USERS VALUES ('${e.uid}','${e.email}','${e.fname}','${e.sname}','${e.phone}','${org}') `)
console.log('Returning...')
return {
  statusCode: 200,
  status:200,
  message: 'Created new organisation',
  body :  JSON.stringify(json)
}
//INSERT INTO USERS VALUES ('${e.uid}','${e.email}','${e.fname}','${e.sname}','${e.phone}'

 //await query (`UPDATE Users SET FirstName = '${e.fname}' , LastName = '${e.sname}' where uid = '${e.uid}'`)

}

exports.editOrg = async (event) => {
    
}
