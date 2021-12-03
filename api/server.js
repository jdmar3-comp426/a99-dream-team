var express = require("express");
var app = express();
// Require database SCRIPT file
var db = require("./database.js");
// Require md5 MODULE
var md5 = require("md5");
// Make Express use its own built-in body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set server port
var HTTP_PORT = 5000;
// Start server
app.listen(HTTP_PORT, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", HTTP_PORT));
});

app.get("/app/", (req, res, next) => {
  res.json({ message: "Your API works! (200)" });
  res.status(200);
});

app.post("/app/new/", (req, res) => {
  const stmt = db.prepare(
    "INSERT INTO userinfo (user, pass, step, game) VALUES (?, ?, ?, ?)"
  );
  const info = stmt.run(req.body.user, md5(req.body.pass), 0, []);
  res.status(201).json({
    message:
      info.changes + " record created: ID " + info.lastInsertRowid + " (201)",
  });
});

app.get("/app/users", (req, res) => {
  const stmt = db.prepare("SELECT * FROM userinfo").all();
  res.status(200).json(stmt);
});

app.get("/app/user/:id", (req, res) => {
  const stmt = db
    .prepare("SELECT * FROM userinfo WHERE id = ?")
    .get(req.params.id);
  res.status(200).json(stmt);
});

app.patch("/app/update/user/:id", (req, res) => {
  const stmt = db.prepare(
    "UPDATE userinfo SET user = COALESCE(?,user), pass = COALESCE(?,pass) WHERE id =?"
  );
  const info = stmt.run(req.body.user, md5(req.body.pass), req.params.id);
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
