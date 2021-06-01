const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.Client_id);

function checkauthenticated(req, res, next){


  let user = {};
  async function verify() {
  
      const ticket = await client.verifyIdToken({
          idToken: req.cookies.session_cookie,
          audience: process.env.Client_id,  // Specify the CLIENT_ID of the app that accesses the backend
      });
      const payload = ticket.getPayload();
    
      user.name = payload.name;
      user.email = payload.email;
      user.picture = payload.picture;
    }
    verify()
    .then(()=>{
        req.user = user;
        next();
    })
    .catch(err=>{
        res.redirect('/login')
    })

}
module.exports = checkauthenticated;
