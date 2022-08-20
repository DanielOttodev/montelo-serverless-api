"use strict";
const {query} = require('./db')

module.exports.listUsers = async (event) => {
  console.log('/getUser');
  console.log(event);
  const res = await query("select * from Users")
  let response = {
    statusCode: 200,
    body : res
  }
  return response;
  }


module.exports.getUser = async (event) => {
  console.log('/getUser');
  console.log(event);
  const res = await query("select * from Users where OrgId = '32' ")
  let response = {
    statusCode: 200,
    body : res
  }
  return response;
}

module.exports.addUser = async (event) => {
  // Params: id,name,phone,email
  console.log('/addUser')
  await query('')
}

module.exports.editUser = async (event) => {
  
}