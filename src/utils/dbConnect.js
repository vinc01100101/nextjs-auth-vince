import mongoose from "mongoose";

function dbConnect(res) {
  return new Promise((resolve) => {
    /*
      check if we have a current connection to the database
      to prevent opening connections exponentially..
      
      readyState values are:
        0 = disconnected
        1 = connected
        2 = connecting
        3 = disconnecting
    */
    const status = ["disconnected", "connected", "connecting", "disconnecting"];
    const state = mongoose.connection.readyState;
    if (state != 0) {
      res.json({ type: "success", status: status[state] });
      return resolve();
    }

    return mongoose.connect(
      process.env.MONGODB_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      },
      (err, client) => {
        if (err) {
          console.log(err);
          res.status(500).end();
          return resolve();
        }
        res.json({ type: "success", status: "connected" });
        return resolve();
      }
    );
  });
}

export default dbConnect;
