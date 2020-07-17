const mongoose = require("mongoose");

/** Connects to the database */
const connect = () => {
  // Starting mongoDB
  mongoose.connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  // Testing DB
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("DB connected");
  });
};

exports.connect = connect;
