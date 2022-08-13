var admin = require("firebase-admin");
const {
  getAuth
} = require('firebase-admin/auth');
var serviceAccount = require("./firebase_skey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Validate token provided with firebase
// On succcess : send a allow AWS policy (200)
// On fail     : send a deny AWS policy which returns a 404 response
module.exports.authToken = async (event) => {
  let uid = ''
  console.log('Event:', event)
  let token = event.headers.clienttoken
  const policy = await getAuth()
    .verifyIdToken(token)
    .then((decodedToken) => { // Resolve

      uid = decodedToken.uid;
      console.log('Success')
      return {
        "principalId": uid, // The principal user identification associated with the token sent by the client.
        "policyDocument": {
          "Version": "2012-10-17",
          "Statement": [{
            "Action": "execute-api:Invoke",
            "Effect": "Allow",
            "Resource": event.routeArn
          }]
        },
      }
    }, () => { // Reject 
      console.error('REJECTED')
      return {
        "status": "Rejected",
        "principalId": uid, // The principal user identification associated with the token sent by the client.
        "policyDocument": {
          "Version": "2012-10-17",
          "Statement": [{
            "Action": "execute-api:Invoke",
            "Effect": "Deny",
            "Resource": event.routeArn
          }]
        },
      }
    })
    .catch((error) => {
      console.log('ERROR:', error);
      console.log(error);
      return {
        "status": "Rejected",
        "principalId": `${uid}`,
        "policyDocument": {
          "Version": "2012-10-17",
          "Statement": [{
            "Action": "execute-api:Invoke",
            "Effect": "Deny",
            "Resource": event.routeArn
          }]
        }
      }
    });
  console.log('POLICY:', policy)
  return policy;
}