import Users from "@/models/User";

const handler = async (req, res) => {
  console.log("POSTING?", JSON.stringify(req.body));
  if (req.method == "POST") {
    try {
      await Users.create(req.body);
      res.redirect("/");
    } catch (e) {
      res.send("Email already exists");
    }
  } else {
    res.send("Only post method allowed");
  }
};

export const config = {
  api: {
    bodyParser: { sizeLimit: "1mb" },
  },
};

export default handler;
