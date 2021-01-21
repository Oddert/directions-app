# Oddert Directions App

An experimental take on daily orginisation and ballancing productivity, recreation and health.

Front end built with React / Redux, backend built with express, MongoDB / Mongoose for storage.

## Live Demo
[https://resolute-church.glitch.me/](https://resolute-church.glitch.me/)

## Installation
You will need to setup a mongodb server and connect it via an .env file
```
$ git clone https://github.com/Oddert/directions-app.git
$ cd directions-app/client
$ npm i
$ cd ..
$ npm i
```
### For development
```
$ npm run dev
```
### For a production build
```
$ npm run build
$ npm start
```

## Scripts
| script | command                                        | action
|--------|------------------------------------------------|------------------------------------------------|
| client-install  | cd client && npm install | installs the client development envirnoment |
| start | node app.js | runs the server with auto restart              |
| server | nodemon app.js                                 | runs the server with auto restart              |
| client | cd client && npm start                         | starts the development server for the client   |
| dev    | concurrently "npm run server" "npm run client" | run both the client and server for development |
