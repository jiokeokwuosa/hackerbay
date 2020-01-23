import jwt from 'jsonwebtoken';
import fs from 'fs';
import request from 'request';
import resizeImg from 'resize-img';
import { join } from 'path';


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
   * @param {function} res - The express res object.
   * @memberof UserUtility
   * @returns {null} - Returns nothing.
   */
  static async downloadImage(url, filename, res) {
    return request(url)
      .on('response')
      .pipe(fs.createWriteStream(filename)).on('close', async () => {
        const options = {
          width: 50,
          height: 50
        };
        const image = await resizeImg(fs.readFileSync(filename), options);
        const origin = join(__dirname, `../../${filename}`);
        if (fs.existsSync(origin))fs.unlinkSync(origin);
        res.set({ 'Content-Type': 'image/png' });
        res.send(image);
      });
  }
}
export default UserUtility;
