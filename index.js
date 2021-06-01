const express = require("express");
const app = express();
const path = require("path");
const checkauthenticated = require('./middleware');
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const PORT=process.env.PORT || 5000
dotenv.config();
const userrouter = require("./router/router");
const loginrouter = require("./router/login");
const cookieParser = require("cookie-parser");

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true, defer: true }));

app.set("view engine", "ejs");
app.use("/static", express.static(path.join(__dirname + "/static")));
app.use(cookieParser());


app.use("/", loginrouter);
app.use("/gmail",checkauthenticated, userrouter);

app.get("*",(req,res)=>{
  res.send("404 Error")
})
app.listen(PORT, () => {
  console.log("connect");
});
