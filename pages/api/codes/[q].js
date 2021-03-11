const fs = require("fs");

export default (req, res) => {
  const query = req.query.q;

  const codes = fs.readFileSync(`./components/${query}.js`, "utf-8");

  res.send(codes);
};
