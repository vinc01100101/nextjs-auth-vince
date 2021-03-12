import mongoose from "mongoose";

function dbConnect() {
  return new Promise((resolve, reject) => {
    // check if we have a connection to the database or if it's currently
    // connecting or disconnecting (readyState 1, 2 and 3)

    const status = ["disconnected", "connected", "connecting", "disconnecting"];
    const state = mongoose.connection.readyState;
    if (state >= 1) {
      return resolve(status[state]);
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
        if (err) return reject(err);
        return resolve("connected");
      }
    );
  });
}

export default dbConnect;
