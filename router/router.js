const router = require("express").Router();
const {Refresh_token,Client_id,Redirect_uri,Secret_id} =process.env
//nodemailer to sent email
const nodemailer=require('nodemailer')
//importing google from googleapis
const {google}=require("googleapis")
//initializing oth2client
const Oath2client=new google.auth.OAuth2(Client_id,Secret_id,Redirect_uri)
Oath2client.setCredentials({'refresh_token':Refresh_token})

//send email from data 
async function sendemail(data){
    try {
        const access_token=await Oath2client.getAccessToken()
        const transport= nodemailer.createTransport({
           service:'gmail',
           auth:{
               type:'OAuth2',
               user:'avineykhetarpal01@gmail.com',
               clientId:Client_id,clientSecret:Secret_id,refreshToken:Refresh_token,accessToken:access_token

           }
           }
        )
        const mailoptions={
            from:'Aviney <avineykhetarpal01@gmail.com>',
            to:data.email,
            subject:data.subject,
            text:data.message
        }
      var result=await transport.sendMail(mailoptions)
      return result
    } catch (error) {
        return error
    }
}
//post request
router.post("/",async(req,res)=>{
   try {
       if(req.body.subject && req.body.message && req.body.email ){
           var result=await sendemail(req.body)
           return res.json({result:result})
       }
       else{
           throw {status:422,message:"Invalid credientials"}
       }
   } catch (error) {
       res.status(500).json({error:error.message})
   }
})



module.exports=router