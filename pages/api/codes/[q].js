const fs = require("fs");

//just returning the component's code, nvm this
export default (req, res) => {
  const query = req.query.q;

  const codes = fs.readFileSync(`./components/${query}.js`, "utf-8");

  res.send(codes);
};
