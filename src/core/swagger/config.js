import swaggerJSDoc from 'swagger-jsdoc';
import config from '../../config';

export default (app) => {

  // Initialize Swagger
  let options = {
    swaggerDefinition: {
      swagger: "2.0",
      info: config.swagger.info,
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
    apis: [
      `${config.base}/auth/**/*.yaml`,
      `${config.base}/api/**/*.yaml`
    ]
  };

  let swaggerSpec = swaggerJSDoc(options);

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
