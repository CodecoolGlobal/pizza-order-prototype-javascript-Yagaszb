const express = require("express");
const fs = require("fs");
const dataRoute = "./pkgs.json";
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(`${__dirname}/../frontend/public`));

const port = 9002;

app.get("/", (req, res) => {
  res.redirect(301, '/pizza/list');
});


const apiRouter = require('./routes/api')

app.use('/api', apiRouter);

app.use('/pizza/list', express.static(path.join(__dirname, "../frontend")));

app.listen(port, _ => console.log(`http://127.0.0.1:${port}`));
