import redis from "redis";

const client = redis.createClient({
  port: 6379,
  host: "127.0.0.1",
});

client.ping((err, pong) => {
  console.log("pong :>> ", pong);
});

client.on("error", function (error) {
  console.log("error :>> ", error);
});

client.on("connect", function () {
  console.log("connected");
});

client.on("ready", function () {
  console.log("Redis to ready");
});

export default client;
