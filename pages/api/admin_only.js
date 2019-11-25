var firebase = require("../../src/firebase/server");
var Cookies = require("cookies");

// Admin-Only demo page, will return 200 for a logged in admin user, and 401 for anyone else
// TODO Move firebase admin initialization into separate module

var keys = ["john woz here"];

const handler = (req, res) => {
  var cookies = new Cookies(req, res, { keys: keys });

  var session = JSON.parse(cookies.get("mapsSession", { signed: true }));

  // Is there a logged in user? If so, continue.
  if (!session.token) {
    console.log("couldn't find a token!");
    console.log(req.cookies);
    res.status(401).end();
  } else {
    firebase.verifyIdToken(session.token).then(claims => {
      if (claims.admin === true) {
        res.status(200).end();
      } else {
        res.status(401).end();
      }
    });
  }
};
export default handler;
