# asksteve-messenger

## Dependencies
- NodeJS and NPM
- MongoDB

## Overview
AskSteve's Messenger Bot built with NodeJS.
Please use the following command on bash/ CMD terminal to run the program locally
```
npm i
npm start
```

Development environment
```
cp .env.example .env
```
**Note**: To develop the program locally, you need the configure a messenger webhook yourself (instructions [here](https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup))

#### Updates 
- **(21/4/2021)** 
  - To create a secure connection for local development, you could use ngrok with `./ngrok http 3000`
  - Implemented MongoDB (with Mongoose) and ENV config file
  - Fixed the chat sequence. You could re-chat with a greeting (e.g."hi!") to reset the sequence

#### Linter
You can use the command `npm run lint` to utilize the ESLint on the project.

#### Testings
You can use the command `npm run test` to utilize the ESLint on the project.

## Environment
**For local development**
```
NODE_ENV=local
PORT=3000
DB_URI=mongodb://127.0.0.1:27017
PAGE_ACCESS_TOKEN=<your messenger access token here>
```
## Deployment
The following program has already been deployed to
**http://cloves-messenger.herokuapp.com**

## Author
William Fu
