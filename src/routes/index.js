import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../swagger.json';
import authRouter from './auth.route';
import jsonRouter from './jsonpatch.route';
import thumbnailRouter from './thumbnail.route';

const routes = app => {
  app.use('/api/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/jsonpatch', jsonRouter);
  app.use('/api/v1/thumbnail', thumbnailRouter);
};

export default routes;
