import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const newConnection = (uri) => {
  const conn = mongoose.createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  conn.on("connected", function () {
    console.log(`Mongodb::: connected::: ${this.name}`);
  });

  conn.on("disconnected", function () {
    console.log(`Mongodb::: disconnected::: ${this.name}`);
  });

  conn.on("error", function (err) {
    console.log(`Mongodb::: error::: ${JSON.stringify(error)}`);
  });

  return conn;
};

// make connection to DB test
const testConnection = newConnection(process.env.URI_MONGODB_TEST);
const userConnection = newConnection(process.env.URI_MONGODB_USER);

export { testConnection, userConnection };
