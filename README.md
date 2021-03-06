# asksteve-messenger

## Dependencies
- NodeJS and NPM

## Overview
AskSteve's Messenger Bot built with NodeJS.

## How To Run
Install all the dependencies needed
```
npm install
```

Please note you need to create your own Facebook app with messenger platform (instructions [here](https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup)). To help you with generating a callback URL, you could utilize the ngrok to generate a secure URL to your `localhost:8080` server.
```
ngrok http 8080
```

#### Development environment
Copy the .env.example to your .env config file.
```
cp .env.example .env
```
Note that you need to change your `FB_ACCESS_TOKEN` to the token string generated by your Facebook App.

All done! Make sure to start the app with and you could try the chatbot with your messenger
```
npm start
```

#### Updates
- **(15/12/2021)**
  - Introducing a new collection (recipient)
  - Deployment
- **(5/12/2021)**
  - Updates dependencies
  - Fixes a few bugs
- **(24/4/2021)**
  - Fixed a few bugs on test codes
  - Refactoring on mongoose connection
- **(21/4/2021)** 
  - To create a secure connection for local development, you could use ngrok with `./ngrok http 3000`
  - Implemented MongoDB (with Mongoose) and ENV config file
  - Fixed the chat sequence. You could re-chat with a greeting (e.g."hi!") to reset the sequence


#### Linter
You can use the command `npm run lint` to utilize the ESLint on the project.

#### Testings
You can use the command `npm run test` to utilize the unit tests (built with Mocha and Chai).

## Deployment
The following program has already been deployed to
**https://boiling-inlet-28923.herokuapp.com/**

## Author
William Fu
