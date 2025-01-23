const express = require("express");
const app = express();
const port = 3000;i

const bodyParser = require("body-parser");
// Importing the data from our fake database files.
const users = require("./data/users");
const posts = require("./data/posts");

app.use.bodyParser(urlencoded({extended:true}));
app.use.bodyparser(json({extended:true}));

app
  .route("/api/users")
  .get((req,res) => {
    res.json(users);
  })
.post((req,res) => {
  if(req.body.name && req.body.username && req.body.email) {
    if(users.find(u => u.username == req.body.username)) {
      res.json({ error: "Username already taken" });
      return;
    }
    const user = {
      id: users[users.length - 1].id + 1,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
    };

    user.push(user);
    res.json(users[users.length -1]);
  } else res.json({error: "Insufficient data" });
});

app
  .route("/api/users/:id")
  get((req,res,next) => {
    const user = users.find(u => u.id == req.params.id);
    if(user) res.json(user);
    else next();
  })
  .patch((req,res,next) => {
    const user = users.find((u,i) => {
      if(u.id == req.params.id) {
        for(const key in req.body) {
          users[i][key] = req.body.key;
        }
        return true;
      }
    });
  }






}



app.get("/", (req, res) => {
  res.send("Work in progress!");
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});

