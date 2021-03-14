import Users from "@/models/User";

const handler = async (req, res) => {
  console.log("POSTING?", JSON.stringify(req.body));
  if (req.method == "POST") {
    try {
      await Users.create(req.body);
      return res.redirect("/register?message=success");
    } catch (e) {
      console.log(e._message);
      if (e._message == "User validation failed") {
        return res.redirect("/register?message=email_already_exists");
      } else {
        return res.redirect("/register?message=server_error");
      }
    }
  } else {
    return res.send("Only post method allowed");
  }
};

export const config = {
  api: {
    bodyParser: { sizeLimit: "1mb" },
  },
};

export default handler;
