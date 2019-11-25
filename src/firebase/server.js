const admin = require("firebase-admin");

var firebase;

if (admin.apps.length && admin.apps[0].name == "server") {
  console.log("looks like fb already exists");
  firebase = admin.apps[0].auth();
} else {
  console.log("doesn't exist yet!");
  firebase = admin
    .initializeApp(
      {
        credential: admin.credential.cert(require("./credentials/server"))
      },
      "server"
    )
    .auth();
}

module.exports = firebase;
