var Cookies = require("cookies");

var keys = ["john woz here"];

const handler = (req, res) => {
  var cookies = new Cookies(req, res, { keys: keys });
  cookies.set("mapsSession", null, { signed: true });
  console.log("session destroyed");
  res.status(200).end();
};

export default handler;
