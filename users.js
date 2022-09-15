const admin = require("firebase-admin");
const {
  getAuth
} = require('firebase-admin/auth');
var serviceAccount = require("./firebase_skey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const {query} = require('./db')

module.exports.listUsers = async (event) => {
  console.log('/listUsers');
  console.log(event);
  const res = await query(`select * from Users where OrgId = ${event.headers.orgid}`)
  let response = {
    statusCode: 200,
    body : JSON.stringify(res)
  }
  return response;
  }

module.exports.getUser = async (event) => {
  console.log('/getUser');
  console.log(event);
  const res = await query(`select * from Users where OrgId = ${event.headers.orgid} `)
  let response = {
    statusCode: 200,
    body : JSON.stringify(res)
  }
  return response;
}

module.exports.addUser = async (event) => {
  // Body: id,name,phone,email
  console.log('/addUser')
  event.body = JSON.parse(event.body);
  console.log(event.body);
  // Create the user in firebase
const usr = await getAuth().createUser({
  email: event.body.email,
  emailVerified: true,
 // phoneNumber: event.body.phone,
  password: event.body.pass,
  displayName: event.body.name,
  disabled: false,
  orgId: event.body.orgId
})
console.log('done')
console.log('USER:',usr)
console.log('EVENT:',event);
console.log(event.body)
  // On success, insert the user into main DB
  await query(`INSERT INTO Users VALUES ('${usr.uid}','${event.body.email}','${event.body.phone}','${event.headers.orgid}','${event.body.name}')`)
  return {
    statusCode: 200
  }
   
}
module.exports.editUser = async (event) => {
}