## Automatic-gmail-sender
We can automatically send email with attachments via gmail api through nodemailer.

## About the project
Built an automatic email sender using gmail api with node.js(ejs) and nodemailer.

## How To Run
Download Node.js from the [official  site](https://nodejs.org/en/download/)(like I did) or from [here](https://github.com/creationix/nvm) , and run the following at the terminal:

```
node index.js
```
### GMAIL API
   To learn how to setup gmail api in node.js, check out the [gmail_signin](https://developers.google.com/identity/sign-in/web/sign-in).
   
### API configuration

* copy/paste your configuration from your google cloud credentials into this file
  * *.env* file
  
### Project Structure
 * **index.js** : Main project file, it has it initialize all the necessary files.
 * **router/router.js**:  It has it's logic to create routing system and the API services.
 * **.env**:  All the necessary credentials
 
### NOTE
   All the emails send will be from `avineykhetarpal01@gmail.com`

