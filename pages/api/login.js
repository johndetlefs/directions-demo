import { useSession } from "next-session";
const admin = require("firebase-admin");

const handler = async (req, res) => {
  await useSession(req, res);

  const token = req.body.token;

  var firebase;

  if (admin.apps[0].name == "server") {
    firebase = admin.apps[0].auth();
  } else {
    admin.initializeApp(
      {
        credential: admin.credential.cert(
          require("../../src/firebase/credentials/server")
        )
      },
      "server"
    );
    firebase = admin.auth();
  }

  firebase.verifyIdToken(token).then(decodedToken => {
    req.session.decodedToken = decodedToken;
    req.session.token = token;
    req.session.save().then(() => {
      console.log("session initiated");
    });

    res.status(200).end();
  });
};
export default handler;
