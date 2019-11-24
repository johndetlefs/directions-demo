const firebase = require("firebase-admin");

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      credential: firebase.credential.cert(
        require("../../src/firebase/credentials/server")
      )
    },
    "server"
  );
}

// console.log(firebase.apps);

module.exports = firebase;
