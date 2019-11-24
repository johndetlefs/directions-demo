import { useSession } from "next-session";
const admin = require("firebase-admin");

// Admin-Only demo page, will return 200 for a logged in admin user, and 401 for anyone else

// TODO Move firebase admin initialization into separate module

const handler = async (req, res) => {
  const session = await useSession(req, res);

  // Is there a logged in user? If so, continue.
  if (!session.token) {
    res.status(401).end();
  } else {
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
