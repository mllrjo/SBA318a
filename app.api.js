const express = require("express");
// const bodyParser = require("body-parser");

// routers
const users = require("./routes/users.api");
const posts = require("./routes/posts.api");
const comments = require("./routes/comments");
const error = require("./utilities/error");

const app = express();
const port = 3000;
// required for POST and PUT requests; qs library
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json({extended:true}));
app.use(express.urlencoded({extended:true}));
app.use(express.json({extended:true}));

app.use((req, res, next) => {
  const time = new Date();

  console.log(
    `-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  );
  if (Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});

app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/comments", comments);

// Adding some HATEOAS links.
app.get("/", (req, res) => {
  res.json({
    links: [
      {
        href: "/api",
        rel: "api",
        type: "GET",
      },
    ],
  });
});
  
// Adding some HATEOAS links.
app.get("/api", (req, res) => {
  res.json({
    links: [
      {
        href: "api/users",
        rel: "users",
        type: "GET",
      },
      {
        href: "api/users",
        rel: "users",
        type: "POST",
      },
      {
        href: "api/posts",
        rel: "posts",
        type: "GET",
      },
      {
        href: "api/posts",
        rel: "posts",
        type: "POST",
      },
      {
        href: "api/comments",
        rel: "comments",
        type: "GET",
      },
      {
        href: "api/comments",
        rel: "posts",
        type: "POST",
      },
      {
        href: "api/comments",
        rel: "comments",
        type: "PATCH",
      },
      {
        href: "api/comments",
        rel: "comments",
        type: "DELETE",
      },
    ],
  });
});
  
// 404 Middleware
app.use((req, res, next) => {
  next(error(404, "Resource Not Found"));
});

// more general error code middleware(?)
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message })
});

app.listen(port, () => {
  console.log(`Server listening on port: ${port}.`);
});

