import jwt from 'jsonwebtoken';

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
   * @returns {string} - Encrypted password.
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
}
export default UserUtility;
