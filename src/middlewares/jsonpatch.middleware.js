import logger from '../config/logger';

/**
   * Validates document
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @param {Next} next - The express next function.
   * @returns {JSON} - A JSON success response.
   */
const validateDocument = (req, res, next) => {
  const { doc, patch } = req.body;
  let isValid = null;
  let message = 'Document/Patch is required and should be an object';
  if (doc && patch) {
    logger.info('step one');
    if (typeof doc === 'object' && typeof patch === 'object') {
      logger.info('step two');
      if (!(doc instanceof Array) && patch instanceof Array) {
        message = 'Document/Patch should not be empty';
        if (Object.keys(doc).length && patch.length) {
          logger.info('step three');
          message = 'Patch should have the keys; path and op';
          isValid = patch.every(obj => obj.path && obj.op);
          if (isValid) return next();
        }
      }
    }
  }
  res.status(400).json({
    status: '400 Invalid Request',
    error: message
  });
};

export default validateDocument;
