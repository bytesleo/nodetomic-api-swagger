# <img src="http://i.imgur.com/BpUrg3a.png" width="50" /> Nodetomic Api Swagger 

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f5084c4bad544b2586e3e973c8e3a336)](https://www.codacy.com/app/kevoj/nodetomic-api-swagger?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=kevoj/nodetomic-api-swagger&amp;utm_campaign=Badge_Grade) [![NPM version](https://badge.fury.io/js/nodetomic-api-swagger.svg)](https://npmjs.org/package/nodetomic-api-swagger) [![Build Status](https://travis-ci.org/kevoj/nodetomic-api-swagger.svg?branch=master)](https://travis-ci.org/kevoj/nodetomic-api-swagger) [![dependencies Status](https://david-dm.org/kevoj/nodetomic-api-swagger/status.svg)](https://david-dm.org/kevoj/nodetomic-api-swagger) [![devDependencies Status](https://david-dm.org/kevoj/nodetomic-api-swagger/dev-status.svg)](https://david-dm.org/kevoj/nodetomic-api-swagger?type=dev) [![Gitter chat](https://img.shields.io/gitter/room/kevoj/scaling-fullstack.svg)](https://gitter.im/scaling-fullstack/Lobby) [![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://raw.githubusercontent.com/kevoj/nodetomic-api-swagger/master/LICENSE) [![Downloads](https://img.shields.io/npm/dt/nodetomic-api-swagger.svg?style=flat-square)](https://npmjs.org/package/nodetomic-api-swagger)

> RESTful API Nodejs designed for horizontal scalability, based on Swagger, Redis, JWT, Passport, Socket.io, Express, MongoDB. Support multiple cluster

#### Include libs
* [redis-jwt](https://github.com/kevoj/redis-jwt)
* [express-easy-helper](https://github.com/kevoj/express-easy-helper)
* [role-calc](https://github.com/kevoj/role-calc)

<a href="https://www.codacy.com/app/kevoj/nodetomic-api-swagger?utm_source=github.com&utm_medium=referral&utm_content=kevoj/nodetomic-api-swagger&utm_campaign=Badge_Grade" ><img src="http://i.imgur.com/n98gapy.png"></a>

### Horizontal scalability

![Imgur](http://i.imgur.com/YdK4xq3.png)

### Preview

![](https://j.gifs.com/0gw5gX.gif)

### Swagger Api

<http://localhost:8000/docs> 

<img src="http://i.imgur.com/FARxCXe.png">

### Technologies

<a><img src="http://oraclelinuxworld.com/wp-content/uploads/2016/01/NodeJS-Small-Blog-Feature-Image-.jpg" width="60"></a>
<a><img src="https://avatars2.githubusercontent.com/u/7658037?v=3&s=400" width="60"></a>
<a><img src="https://chris.lu/upload/images/redis.png" width="60"></a>
<a><img src="http://nightdeveloper.net/wp-content/uploads/2014/12/mongo_db.png" width="60"></a>
<a><img src="http://code.runnable.com/images/provider-icons/icon-express-alt.svg" width="60"></a>
<a><img src="https://www.pubnub.com/wp-content/uploads/2014/07/SOCKETIOICON.gif" width="60"></a>
<a><img src="https://pbs.twimg.com/profile_images/542039812916510720/Vw-JEJQA.png" width="60"></a>
<a><img src="https://cms-assets.tutsplus.com/uploads/users/16/posts/24511/preview_image/babel-1.png" width="60"></a>
<a><img src="http://www.themightycribb.com/wp-content/uploads/2016/08/gulpjs-logo.jpg" width="60"></a>
<a><img src="https://avatars0.githubusercontent.com/u/8770005?v=3&s=400" width="60"></a>
<a><img src="http://bluebirdjs.com/img/logo.png" width="60"></a>
<a><img src="https://nodemon.io/nodemon.svg" width="60"></a>
<a><img src="https://pbs.twimg.com/profile_images/599259952574693376/DMrPoJtc.png" width="60"></a>
<a><img src="http://www.erikasland.com/static/images/mongoose.png" width="60"></a>
<a><img src="https://nr-platform.s3.amazonaws.com/uploads/platform/published_extension/branding_icon/300/PKpktytKH9.png" width="60"></a>
<a><img src="https://awesomes.oss-cn-beijing.aliyuncs.com/repo/151017151426-82-1.jpg?x-oss-process=style/repo" width="60"></a>
<a><img src="https://seeklogo.com/images/E/eslint-logo-DDFB6EBCF6-seeklogo.com.png" width="60"></a>
<a><img src="https://avatars3.githubusercontent.com/u/2824157?v=3&s=400" width="60"></a>
<a><img src="https://i2.wp.com/community.nodemailer.com/wp-content/uploads/2015/10/n2-2.png?fit=422%2C360&ssl=1" width="60"></a>
<a><img src="https://cdn.xebialabs.com/assets/files/plugins/travis-ci.jpg" width="60"></a>

## Requirements

- [Nodejs](https://nodejs.org) **>= 6.x.x** (**Recommended 8.x.x**)
- [MongoDB](https://www.mongodb.com)  **>= 3.x.x**
- [Redis](https://redis.io)  **>= 3.x.x** (**Recommended 4.x.x**)

## Installation

```bash
git clone https://github.com/kevoj/nodetomic-api-swagger
cd nodetomic-api-swagger
npm i
```

## Development

### Start

`npm start`

![Imgur](https://i.imgur.com/qY1mzDZ.png)

*  <http://localhost:8000>

Optional: `npm run modemon` if you want work with **nodemon**.

### Build

`npm run build`

![Imgur](http://i.imgur.com/yTI3otr.png)

Generate folder **`dist`**. So "dist/client" is optional. You can paste the compilation of a client here, for example of Vue, React, Angular ...

![Imgur](http://i.imgur.com/u4axBDN.png)

### Test

`npm test`

![Imgur](http://i.imgur.com/4cM4HXs.png)

### Lint

`npm run lint`

## Pm2 [Development]

#### Simple

Run pm2 in a single thread and run pm2 console

`npm run dev-simple`

![Imgur](http://i.imgur.com/cNuBVzK.png)

* <http://localhost:8000>

#### Cluster

Run pm2 in multiple threads and run pm2 console

`npm run dev-cluster`

![Imgur](http://i.imgur.com/wEU2Uz5.png)

* <http://localhost:8000>

## Pm2 [Production]

### Simple

Run pm2 in a single thread

`npm run simple`

![Imgur](http://i.imgur.com/tLA2hu7.png)

* <http://localhost:8000>

### Cluster

Run pm2 in multiple threads

`npm run cluster`

![Imgur](http://i.imgur.com/HTWJcUk.png)

* <http://localhost:8000>

## Stop

### PM2

destroy pm2 simple and pm2 cluster

`npm stop`

### Node

destroyed all process for node

`killall node`

## How to create..

### Model

src/api/**models**/hello.js

```javascript

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const HelloSchema = new Schema({
  greet: {
    type: String,
    required: [true, 'Greet is required.']
  },
  language: {
    type: String,
    required: [true, 'Language is required.']
  }
});

export default mongoose.model('Hello', HelloSchema);

```

### Controller

src/api/**controllers**/hello.js

```javascript

import { result, notFound, error } from 'express-easy-helper';
import Hello from '../models/hello';

export function list(req, res) {
  return Hello.find().exec()
        .then(notFound(res))
        .then(result(res))
        .catch(error(res));
}

```
### Swagger (Router)

src/api/**swagger**/hello.yaml

```yaml

/api/hello:
  x-swagger-router-controller: hello 
  get:
    operationId: list
    tags:
      - Hello
    summary: Get list Hello's
    description: Returns all hello
    responses:
      200:
        description: Success
      404:
        description: Not found
      500:
        description: Error

```

### Swagger (Router + middleware)

src/api/**swagger**/hello.yaml

```yaml

/api/hello:
  x-swagger-router-controller: hello 
  get:
    operationId: list
    security:
      - Bearer: []
    x-security-scopes:
      - admin
    tags:
      - Hello
    summary: Get list Hello's
    description: Returns all hello
    responses:
      200:
        description: Success
      404:
        description: Not found
      500:
        description: Error

```

### Socket

src/api/**sockets**/hello.js

```javascript

export let socket = null;
export let io = null;

// Constructor
export default (_socket, _io) => {
    socket = _socket;
    io = _io;
    on();
}

// Here should be all events 'on'
export function on() {
  // Listen 'example'
    socket.on('example', function (data) {
  // Emit to cool
      emit('cool', data);
    });
}

// Emit events
export function emit(event, data) {
    io.emit(event, data);
}

```

### Controller + Socket

src/api/**controllers**/hello.js

```javascript

import { result } from 'express-easy-helper';
import { emit } from '../sockets/hello';

export function test(req, res) {

  emit('hello','world');
  return result(res, 'Socket emitted!');

}

```
## License

MIT © [Leonardo Rico](https://github.com/kevoj/nodetomic-api-swagger/blob/master/LICENSE)