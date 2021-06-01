const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.Client_id);
const checkauthenticated = require('../middleware');

const router = require("express").Router();

router.get("/",(req,res)=>{
  redirect("/login")
})
router.get("/login", (req, res) => {
    if (req.cookies["session_cookie"]) {
      res.redirect("/gmail/");
    }
    res.render("login");
  });
  
  
  
router.post("/login", (req, res) => {
    const { token } = req.body;
  
    async function verify() {
      await client.verifyIdToken({
        idToken: token,
        audience: process.env.Client_id,
      });
    }
    verify()
      .then(() => {
        res.cookie("session_cookie", token);
        res.send("success")
      })
      .catch(console.error);
  });
  
router.get("/logout",checkauthenticated, (req, res) => {
    res.clearCookie("session_cookie");
    res.redirect('/login')
  });

  module.exports=router