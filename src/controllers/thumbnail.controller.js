import logger from '../config/logger';
import UserUtility from '../utils';

/**
 *Contains ThumbnailController Class
 *
 * @class ThumbnailController
 */
class ThumbnailController {
  /**
   * Resizes image.
   * @param {Request} req - Request object.
   * @param {Response} res - Response object.
   * @memberof ThumbnailController
   * @returns {JSON} - A JSON success response.
   */
  static async thumbnail(req, res) {
    try {
      logger.info('we are good');
      const { url } = req.body;
      UserUtility.downloadImage(url, 'myimage.png', res);
    } catch (err) {
      return res.status(500).json({
        status: '500 Internal server error',
        error: 'Error resizing image'
      });
    }
  }
}
export default ThumbnailController;
