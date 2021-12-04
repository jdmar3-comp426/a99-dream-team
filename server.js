var express = require("express");
var app = express();
// Require database SCRIPT file
var db = require("./ database.js");
// Require md5 MODULE
var md5 = require("md5");
var cors = require("cors");
// Make app use cors
app.use(cors());
// Make Express use its own built-in body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set server port
var HTTP_PORT = 5000;
// Start server
app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});

// app.get("/", (req, res, next) => {
//   response.sendFile(path.join(__dirname + "/mainpage.html"));
// });

app.get("/app/", (req, res, next) => {
  res.json({ message: "Your API works! (200)" });
  res.status(200);
});

// Creating a new user's account info
app.post("/app/new/user", (req, res) => {
  // var data = {
  //   user: req.body.user,
  //   pass: md5(req.body.pass),
  // };
  const stmt = db.prepare("INSERT INTO userinfo (user, pass) VALUES (?, ?)");
  const info = stmt.run(req.body.user, md5(req.body.pass));
  res.status(201).json({
    message:
      info.changes + " record created: ID " + info.lastInsertRowid + " (201)",
  });
});

// Creating a user's gameplay info
app.post("/app/new/game", (req, res) => {
  const stmt = db.prepare(
    "INSERT INTO gameplay (currStep, bestStep, game) VALUES (?, ?, ?)"
  );
  const info = stmt.run(req.body.currStep, req.body.bestStep, req.body.game);
  res.status(201).json({
    message:
      info.changes + " record created: ID " + info.lastInsertRowid + " (201)",
  });
});

// Retrieving all user rows from the userinfo table
app.get("/app/users", (req, res) => {
  const stmt = db.prepare("SELECT * FROM userinfo").all();
  res.status(200).json(stmt);
});

// Retrieving all game rows from the gameplay table
app.get("/app/games", (req, res) => {
  const stmt = db.prepare("SELECT * FROM gameplay").all();
  res.status(200).json(stmt);
});

// Retrieving a specific user row by id
app.get("/app/user/:id", (req, res) => {
  const stmt = db
    .prepare("SELECT * FROM userinfo WHERE id = ?")
    .get(req.params.id);
  res.status(200).json(stmt);
});

app.get("/app/user/auth", (req, res) => {
  const stmt = db
    .prepare("SELECT * FROM userinfo WHERE user = ? AND pass = ?")
    .get(req.body.user, req.body.pass);
  if (stmt == null) {
    res.status(500).send("Incorrect");
  } else {
    res.status(200).json(stmt);
  }
});

// Retrieving a specific user's game info by id
app.get("/app/game/:id", (req, res) => {
  const stmt = db
    .prepare("SELECT * FROM gameplay WHERE id = ?")
    .get(req.params.id);
  res.status(200).json(stmt);
});

// Updating a user's userinfo row
app.patch("/app/update/user/:id", (req, res) => {
  const stmt = db.prepare(
    "UPDATE userinfo SET user = COALESCE(?,user), pass = COALESCE(?,pass) WHERE id =?"
  );
  const info = stmt.run(req.body.user, md5(req.body.pass), req.params.id);
  res.status(200).json({
    message: info.changes + " record updated: ID " + req.params.id + " (200)",
  });
});

// Updating a specific user's gameplay info
app.patch("/app/update/game/:id", (req, res) => {
  const stmt = db.prepare(
    "UPDATE gameplay SET currStep = COALESCE(?,currStep), bestStep = COALESCE(?,bestStep), game = COALESCE(?,game) WHERE id =?"
  );
  const info = stmt.run(
    req.body.currStep,
    req.body.bestStep,
    req.body.game,
    req.params.id
  );
  res.status(200).json({
    message: info.changes + " record updated: ID " + req.params.id + " (200)",
  });
});

app.delete("/app/delete/user/:id", (req, res) => {
  const stmt = db.prepare("DELETE FROM userinfo WHERE id = ?");
  const info = stmt.run(req.params.id);
  res.status(200).json({
    message: info.changes + " record deleted: ID " + req.params.id + " (200)",
  });
});

app.use(function (req, res) {
  res.json({ message: "Endpoint not found. (404)" });
  res.status(404);
});