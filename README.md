# Nodetomic-api-swagger [![NPM version](https://badge.fury.io/js/nodetomic-api-swagger.svg)](https://npmjs.org/package/nodetomic-api-swagger) [![Build Status](https://travis-ci.org/kevoj/nodetomic-api-swagger.svg?branch=master)](https://travis-ci.org/kevoj/nodetomic-api-swagger) [![dependencies Status](https://david-dm.org/kevoj/nodetomic-api-swagger/status.svg)](https://david-dm.org/kevoj/nodetomic-api-swagger) [![devDependencies Status](https://david-dm.org/kevoj/nodetomic-api-swagger/dev-status.svg)](https://david-dm.org/kevoj/nodetomic-api-swagger?type=dev) [![Gitter chat](https://img.shields.io/gitter/room/kevoj/scaling-fullstack.svg)](https://gitter.im/scaling-fullstack/Lobby) [![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](https://raw.githubusercontent.com/kevoj/nodetomic-api-swagger/master/LICENSE) [![Downloads](https://img.shields.io/npm/dt/nodetomic-api-swagger.svg?style=flat-square)](https://npmjs.org/package/nodetomic-api-swagger)

> Simple and fast Restful API designed for horizontal scalability including cluster, based on Swagger, Socket.io, Nodejs, Redis + Passport, MongoDB, Express

## Examples

![](https://j.gifs.com/0gw5gX.gif)

<http://localhost:8000/docs> 

<img src="http://i.imgur.com/sR1yfe1.png" width="800" >

#### Example horizontal scalability

<img src="https://applicationarchitecture.files.wordpress.com/2010/06/f0028-horizontal-scalability-typical-scenario.png" width="500">

#### Technologies

<a><img src="http://solucionesit.ldtsynergy.com/-/Srvs015/MongoDB/file/view/mongodb.png/547250106/315x368/mongodb.png" width="60"></a>
<a><img src="http://code.runnable.com/images/provider-icons/icon-express-alt.svg" width="60"></a>
<a><img src="https://chris.lu/upload/images/redis.png" width="60"></a>
<a><img src="https://www.pubnub.com/wp-content/uploads/2014/07/SOCKETIOICON.gif" width="60"></a>
<a><img src="http://oraclelinuxworld.com/wp-content/uploads/2016/01/NodeJS-Small-Blog-Feature-Image-.jpg" width="60"></a>
<a><img src="http://www.themightycribb.com/wp-content/uploads/2016/08/gulpjs-logo.jpg" width="60"></a>
<a><img src="https://cms-assets.tutsplus.com/uploads/users/16/posts/24511/preview_image/babel-1.png" width="60"></a>
<a><img src="https://avatars0.githubusercontent.com/u/8770005?v=3&s=400" width="60"></a>
<a><img src="http://bluebirdjs.com/img/logo.png" width="60"></a>
<a><img src="https://nodemon.io/nodemon.svg" width="60"></a>
<a><img src="https://www.codejobs.biz/public/images/blog/original/fa2794cde49d5ab.jpg" width="60"></a>
<a><img src="https://pbs.twimg.com/profile_images/599259952574693376/DMrPoJtc.png" width="60"></a>
<a><img src="http://www.erikasland.com/static/images/mongoose.png" width="60"></a>
<a><img src="https://nr-platform.s3.amazonaws.com/uploads/platform/published_extension/branding_icon/300/PKpktytKH9.png" width="60"></a>
<a><img src="https://awesomes.oss-cn-beijing.aliyuncs.com/repo/151017151426-82-1.jpg?x-oss-process=style/repo" width="60"></a>
<a><img src="https://seeklogo.com/images/E/eslint-logo-DDFB6EBCF6-seeklogo.com.png" width="60"></a>
<a><img src="https://avatars3.githubusercontent.com/u/2824157?v=3&s=400" width="60"></a>
<a><img src="https://i2.wp.com/community.nodemailer.com/wp-content/uploads/2015/10/n2-2.png?fit=422%2C360&ssl=1" width="60"></a>
<a><img src="https://avatars2.githubusercontent.com/u/7658037?v=3&s=400" width="60"></a>
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
## Features

* **Tokens**
  * JWT merged with REDIS

* **Redis**
  * Pub/Sub Expired, del, etc by key

* **Middleware**
  * Login validation
  * Role validation

* Socket.io
  * cluster

* **Authentication**
  * local
  * facebook
  * twitter
  * google
  * github
  * bitbucket

* **Session**
  * Single or Multiple (One or more devices at the same time)
  * Get list of sessions
  * Destroy a session

* **Scalability**
  * Support for simple execution
  * Support for cluster

## Structure

* **client**
* **src**
  * api
    * controllers
    * models
    * sockets
    * swagger
  * assets
  * auth
    * controllers
    * passports
    * swagger
    * services
  * config
  * core
  * lib
  * seeds
  * views
  * app.js

## Development

### Start

`npm start`

*  <http://localhost:8000>

### Build

`npm run build`

* Generate output folder: **`dist`**

  * dist
    * client
    * server
    * cluster.config.js
    * simple.config.js
    * package.json
      * **npm start**
      * **npm run simple**
      * **npm run cluster**

### Test

`npm test`

### Lint

`npm lint`

## Node [Production]

### Default

**Description:** Run node in a single thread

`npm run serve`

* <http://localhost:8000>

## PM2 [Development]

### Simple

**Description:** Run pm2 in a single thread and run the monitor

`npm run dev-simple`

* <http://localhost:8000>

### Cluster

**Description:** Run pm2 in multiple threads and run the monitor

`npm run dev-cluster`

* <http://localhost:8000>

## PM2 [Production]

### Simple

**Description:** Run pm2 in a single thread

`npm run simple`

* <http://localhost:8000>

### Cluster

**Description:** Run pm2 in multiple threads

`npm run cluster`

* <http://localhost:8000>

## Destroy

### PM2

**Description:** destroyed pm2 simple and pm2 cluster

`npm stop`

### Node

**Description:** destroyed all process for node
  
`killall node`

## License

MIT © [Leonardo Rico](https://github.com/kevoj/nodetomic-api-swagger/blob/master/LICENSE)
