import { useSession } from "next-session";
const admin = require("firebase-admin");

// This endpoint updates a user in Firebase with a basic user role - "Admin: true".

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

    firebase.verifyIdToken(session.token).then(() => {
      firebase
        .setCustomUserClaims("7EsRvBLD8ZRSTcDdDPdUKpCkuYI2", { admin: true })
        .then(() => {
          console.log("he got admin rights!!");
        });
    });
    res.status(200).end();
  }
};
export default handler;
