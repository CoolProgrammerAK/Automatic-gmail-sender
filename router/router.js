const router = require("express").Router();
const { Refresh_token, Client_id, Redirect_uri, Secret_id } = process.env;
const nodemailer = require("nodemailer");
const path = require("path");
const { google } = require("googleapis");
const Oath2client = new google.auth.OAuth2(Client_id, Secret_id, Redirect_uri);
Oath2client.setCredentials({ refresh_token: Refresh_token });
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./static/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage: storage,
}).single("attachment");


async function sendemail(data, file,user) {
  try { 
    const access_token = await Oath2client.getAccessToken();
  
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user:"avineykhetarpal01@gmail.com",
        refreshToken: Refresh_token,
        accessToken: access_token,
        clientId: Client_id,
        clientSecret: Secret_id,
    
      },
    });
    if (file) {
      const mailoptions = {
        from: `${user.name} <${user.email}>`,
        to: data.email,
        subject: data.subject,

        text: data.message ?? "",
        attachments: [
          {
            fileName: file.fileName ?? "",
            path: "C:\\Users\\HP\\Desktop\\GMAIL\\" + file.path ?? "",
          },
        ],
      };

      await transport.sendMail(mailoptions);
    } else {
     
      const mailoptions = {
        from: `${user.name} <${user.email}>`,
        to: data.email,
        subject: data.subject,
       
        text: data.message ?? "",
      };

      await transport.sendMail(mailoptions);
    }

    return "Email sent successfully";
  } catch (error) {
    console.log(error)
    return error.response.data.error_description;
  }
}

router.get("/", (req, res) => {
 
  
  res.render("home",{message:"",user:req.user});
});

router.post("/", upload, async (req, res) => {
  try {
    if (req.body.subject && req.body.email) {
      var result = await sendemail(req.body, req.file,req.user);
      res.render("home",{message:result,variant:"success",user:req.user});

    } else {
      throw { status: 422, message: "Invalid credientials" };
    }
  } catch (error) {
    res.render("home",{message:error,variant:"danger",user:req.user});
  }
});

module.exports = router;
