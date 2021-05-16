## Automatic-gmail-sender
Api built using node.js,nodemail and gmail api
## About the project
We can automatically send email via gmail api through nodemailer.


## How To Run
Download Node.js from the [official  site](https://nodejs.org/en/download/)(like I did) or from [here](https://github.com/creationix/nvm) , and run the following at the terminal:

```
node index.js
```
### Project Structure
 * **index.js** : Main project file, it has it initialize all the necessary files.
 * **router/router.js**:  It has it's logic to create routing system and the API services.
 * **.env**:  All the necessary credentials
 
 ## Api endpoints
 

 ### POST /gmail/
 Return a 200 status code showing result.

**Post data**

|          Name | Required |  Type   | Description                                                                                                                                                         |
| -------------:|:--------:|:-------:| ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|     `subject` | required | string  | Subject of theemail whivh u need to send<br/><br/>   
|    `message` | required | string  | Message of theemail which u need to send <br/><br/>               |
|    `email` | required | string  | Email to which you send the message <br/><br/>               |
    

