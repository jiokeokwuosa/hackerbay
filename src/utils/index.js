import jwt from 'jsonwebtoken';
import fs from 'fs';
import request from 'request';
import resizeOptimizeImages from 'resize-optimize-images';
import resizeImg from 'resize-img';
import { join } from 'path';
import logger from '../config/logger';

/**
 *Contains Helper methods
 *
 * @class UserUtility
 */
class UserUtility {
  /**
   * Generates a token
   * @static
   * @param {string} username - Payload to pass to jwt.
   * @memberof UserUtility
   * @returns {string} - Encrypted generated token.
   */
  static generateToken(username) {
    const token = jwt.sign(
      {
        data: { username }
      },
      process.env.SECRET || 'alternativeSecret',
      { expiresIn: '30d' }
    );
    return token;
  }

  /**
   * Downloads an image
   * @static
   * @param {string} url - The image URL.
   * @param {string} filename - The name of the file.
   * @param {function} callback - The callback function.
   * @memberof UserUtility
   * @returns {null} - Returns nothing.
   */
  static downloadImage(url, filename, callback) {
    request(url).pipe(fs.createWriteStream(filename)).on('close', () => {
      (async () => {
        const options = {
          width: 90,
          height: 90
        };
        const image = await resizeImg(fs.readFileSync(filename), options);
        fs.writeFileSync('uni.png', image);
      })();
    });
  }
}
export default UserUtility;
