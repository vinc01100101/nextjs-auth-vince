import dbConnect from "../../../utils/dbConnect";

export default (req, res) => {
  console.log("Trying to initiate database connection..");
  dbConnect()
    .then((status) => {
      res.json({ type: "success", status });
    })
    .catch((err) => {
      res.json({ type: "error", status: err });
    });
};
