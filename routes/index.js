var express = require("express");
var router = express.Router();

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: process.env.PUSHER_APPID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

router.put("/users/:name", function (req, res) {
  // (3)
  console.log("User joined: " + req.params.name);
  pusher.trigger("chat_channel", "join", {
    name: req.params.name,
  });
  res.sendStatus(204);
});

router.delete("/users/:name", function (req, res) {
  // (4)
  console.log("User left: " + req.params.name);
  pusher.trigger("chat_channel", "part", {
    name: req.params.name,
  });
  res.sendStatus(204);
});

router.post("/users/:name/:messages", function (req, res) {
  console.log("User " + req.params.name + " sent message: " + req.body.message);
  pusher.trigger("chat_channel", "message", {
    name: req.params.name,
    message: req.body.message,
  });
  res.sendStatus(204);
});



module.exports = router;
