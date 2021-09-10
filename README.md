# quasar-fire-operation

The project is designed to store the information sent through an API Rest for a group of satellites that communicate with a spacecraft (emitter).

You can store the message and distance from the sender. The message that reaches each satellite is incomplete so it must be complemented with the one sent to the others to decrypt it.

It allows obtaining the coordinates of the sender and the message, consulting through the API.
## Content
* JSON with the information of the satellites in the route **mocks\info_satellites.json**
* available functions are located  in the folder **controllers**
* routes available to access by API Rest   in the folder **routes**
* data management services in the folder **services**

## Demo
* [Demo of the proyect](http://ec2-18-117-182-83.us-east-2.compute.amazonaws.com)
* Postman collections [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/17377934-3a0c0029-8d11-4d8b-aaf0-4563639bc3ab?action=collection%2Ffork&collection-url=entityId%3D17377934-3a0c0029-8d11-4d8b-aaf0-4563639bc3ab%26entityType%3Dcollection%26workspaceId%3D9b0bb078-e20e-47a9-9c36-5770fbd804c1)

## How to clone
it is a private repository so access must be requested

download the repository from [quasar-fire-operation](https://github.com/Jessroa3/quasar-fire-operation.git)

## Installation
To install and run this proyect just type and execute
```bash
npm install
```

## Run
You must have node version 15.0.1 installed

* to run in developer mode with nodemon 

```bash
npm run dev
```

* to run 

```bash
npm start
```

### Libraries
* Math.js [Documentation](https://mathjs.org/index.html)
* Algegra.js [Documentation](https://algebra.js.org/)
