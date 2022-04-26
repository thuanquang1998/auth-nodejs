import express from "express";
import querystring from "query-string";
import httpProxy from "http-proxy";

const route = express.Router();
const proxy = httpProxy.createProxyServer({});

route.get("/login", (req, res, next) => {
  const scope = "user-read-private user-read-email";
  //   res.redirect(
  //     302,
  //     "https://accounts.spotify.com/authorize?" +
  //       querystring.stringify({
  //         response_type: "code",
  //         client_id: process.env.CLIENT_ID,
  //         scope: scope,
  //         redirect_uri: process.env.REDIRECT_URI,
  //       })
  //   );

  proxy.web(req, res, {
    // target: `https://accounts.spotify.com/authorize?${querystring.stringify({
    //   response_type: "code",
    //   client_id: process.env.CLIENT_ID,
    //   scope: scope,
    //   redirect_uri: process.env.REDIRECT_URI,
    // })}`,
    target: "https://the-api-collective.com/api/spotify-api/",
  });
  res.end();
  //   res.send(200, "Login spotify");
});

export default route;
