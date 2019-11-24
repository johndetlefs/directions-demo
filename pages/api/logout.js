import { useSession } from "next-session";

const handler = async (req, res) => {
  await useSession(req, res);
  req.session.destroy();
  console.log("session destroyed");
  res.status(200).end();
};

export default handler;
