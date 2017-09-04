
import swaggerTools from 'swagger-tools';
import express from 'express';
import { error } from 'express-easy-helper';
import { mw } from '../../auth/services/mw';
import config from '../../config';

export async function index(app) {

    let swaggerConfig = await require('./config').default(app);

    let routerConfig = {
        controllers: [
            `${config.base}/api/controllers`,
            `${config.base}/auth/controllers`
        ],
        useStubs: false // If you want use examples.
    };

    return new Promise((resolve, reject) => {

        swaggerTools.initializeMiddleware(swaggerConfig, middleware => {

            // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
            app.use(middleware.swaggerMetadata());

            // Provide the security handlers
            app.use(middleware.swaggerSecurity({ Bearer: mw }));

            // Validate Swagger requests
            app.use(middleware.swaggerValidator({ validateResponse: false }));

            // Route validated requests to appropriate controller
            app.use(middleware.swaggerRouter(routerConfig));

            // Serve the Swagger documents and Swagger UI
            //   http://localhost:8000/docs => Swagger UI
            //   http://localhost:8000/api-docs => Swagger document
            // app.use(middleware.swaggerUi());

            app.use(errorHandler);

            router(app, swaggerConfig);

            resolve();
        });

    })

}

function router(app, swaggerConfig) {

    // Delete Paths from /api-docs
    // Example -> delete swaggerConfig.paths['/auth/github'];
    if (config.oAuth) {
        Object.keys(config.oAuth).forEach(elem => {
            if (elem !== 'local') {
                delete swaggerConfig.paths[`/auth/${elem}`]
                delete swaggerConfig.paths[`/auth/${elem}/callback*`]
            }
        });
    }

    // If Swagger is enabled then the router is enabled!
    if (config.swagger.enabled) {
        app.get(`/swagger.json`, (req, res) => res.json(swaggerConfig));
        app.use('/docs', express.static(`${config.base}/lib/swagger/ui`));
    }
};

// disable debug [object][object]
function errorHandler(err, req, res, next) {
    if (!res.headersSent) {
        return error(res, err.message);
    }
}
