<h1 align="center">Kilat-Go Bus Shared</h1>



This note app for backend. Built with NodeJs using the ExpressJs Framework and XAMPP as web server. [More about Express](https://en.wikipedia.org/wiki/Express.js)
## Built With
[![Express.js](https://img.shields.io/badge/Express.js-4.x-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.10.16-green.svg?style=rounded-square)](https://nodejs.org/)
[![mysql.com](https://img.shields.io/badge/XAMPP-v.7.4.3-green.svg?style%3Drounded-square)](https://apachefriends.org/)

## Requirements
1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.insomnia.rest/">Insomnia</a>
4. Web Server (ex. localhost) 

## How to run the app ?
1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL using Third-party tool xampp
5. Create a database with the name note, and Import file [kilat-go.sql] to **phpmyadmin**
6. Open Insomnia desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:8080/notes)
8. You can see all the end point [here](#end-point)

## Set up .env file
Open .env file on your favorite code editor, and copy paste this code below :
```
PORT=8080
HOST=localhost
USER=root // default
PASS= // default
DATABASE=kilat-go
NODE_ENV=development node server.js
```

## End Point
**1. GET**
* `/`
* `/auth/verify`
* `/users`
* `/users/userdetail`
* `/bus`
* `/route`
* `/schedule`
* `/transactions`
* `/agents`
* `/reserve`
* `/reserve/:id`


**2. POST**
* `/auth/login`
* `/auth/register`
* `/auth/forgot-password`
* `/users/`
* `/users/userdetail`
* `/users/topup`
* `/bus/`
* `/route/`
* `/schedule/`
* `/transactions/`
* `/agents/`
* `/reserve/`

**3. PATCH**
* `/users/:id`
* `/users/userdetail`
* `/transactions/:id`
* `/schedule/:id`
* `/route/:id`
* `/reserve/:id`
* `/bus/:id`
* `/agents/:id`

**4. DELETE**
* `/auth`
* `/users/:id`
* `/bus/:id`
* `/route/id`
* `/schedule/:id`
* `/transactions/:id`
* `/agents/:id`
* `/reserve/:id`