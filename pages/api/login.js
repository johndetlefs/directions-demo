var firebase = require("../../src/firebase/server");
var Cookies = require("cookies");

var keys = ["john woz here"];

const handler = (req, res) => {
  var cookies = new Cookies(req, res, { keys: keys });

  const token = req.body.token;

  firebase.verifyIdToken(token).then(decodedToken => {
    const data = { decodedToken: decodedToken, token, token };
    cookies.set("mapsSession", JSON.stringify(data), { signed: true });
    console.log("session initiated");

    res.status(200).end();
  });
};
export default handler;
