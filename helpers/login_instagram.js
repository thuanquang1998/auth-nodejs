const client = require("../helpers/connections_redis");
const createError = require("http-errors");

client.set("test", "11111111", "EX", 365 * 24 * 60 * 60, (err, reply) => {
  if (err) {
    // reject(createError.InternalServerError());
  }
});
