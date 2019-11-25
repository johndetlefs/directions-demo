var firebase = require("../../src/firebase/server");
var Cookies = require("cookies");

// This endpoint updates a user in Firebase with a basic user role - "Admin: true".

var keys = ["john woz here"];

const handler = (req, res) => {
  var cookies = new Cookies(req, res, { keys: keys });

  var session = JSON.parse(cookies.get("mapsSession", { signed: true }));

  // Is there a logged in user? If so, continue.
  if (!session.token) {
    res.status(401).end();
  } else {
    // put user ID here
    const uid = "7EsRvBLD8ZRSTcDdDPdUKpCkuYI2";

    firebase.verifyIdToken(session.token).then(() => {
      firebase.setCustomUserClaims(uid, { admin: true }).then(() => {
        console.log("he got admin rights!!");
      });
    });
    res.status(200).end();
  }
};
export default handler;
