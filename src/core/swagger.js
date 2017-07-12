import swaggerJSDoc from 'swagger-jsdoc';
import config from '../config';
import fs from 'fs';

export default (app) => {

  let options = {
    swaggerDefinition: {
      swagger: "2.0",
      info: {
        version: 'v1.0',
        title: config.swagger.title,
        description: config.swagger.description,
        contact: config.swagger.contact,
        license: config.swagger.license,
      },
      basePath: `/`,
      schemes: [
        'http', 'https'
      ],
      securityDefinitions: {
        Bearer: {
          type: 'apiKey',
          name: 'Authorization',
          in : 'header',
          description: 'The following syntax must be used in the "Authorization" header  Bearer xxxxxx.yyyyyyy.zzzzzz'
        },
        // "iss_a": {
        //   "type": "oauth2",
        //   "authorizationUrl": `/auth/github`,
        //   "flow": "authorization_code",
        //   "tokenUrl": "https://xxxxxxxxxxxx.xxx.co...",
        // }
      }
    },
    consumes: ['application/json'],
    produces: ['application/json'],
    // path to the API docs
    // apis: [`${config.base}/api/${version}/**/*.yaml`,
    //   `${config.base}/lib/**/*.yaml`
    // ]
    apis: [`${config.base}/api/swagger/**/*.yaml`,
      //`${config.base}/lib/**/*.yaml`
    ]
  };

  let swaggerSpec = swaggerJSDoc(options);

  if (config.swagger.enabled)
    app.get(`/swagger.json`, (req, res) => res.json(swaggerSpec));

  return swaggerSpec;


  // If you want use Swagger into .js = ${config.base}/**/*.js

  /**
   * @swagger
   * definitions:
   *   Example:
   *     properties:
   *       field1:
   *         type: string
   *       field2:
   *         type: string
   */

  /**
   * @swagger
   * /api/example:
   *   get:
   *     tags:
   *       - Example
   *     description: Returns all Example's
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of Example's
   *         schema:
   *           type: array
   *           items:
   *            $ref: '/definitions/Example'
   *       500:
   *         description: Invalid status value
   */

};
