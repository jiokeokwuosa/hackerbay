import UserUtility from '../utils';
/**
 *Contains Auth Controller
 *
 * @class AuthController
 */
class AuthController {
  /**
   * Logins a user.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof AuthController
   * @returns {JSON} - A JSON success response.
   */
  static async login(req, res) {
    try {
      const { username } = req.body;
      const token = UserUtility.generateToken(username);
      const response = {
        token,
        username
      };
      return res.status(200).json({
        status: 'success',
        data: response
      });
    } catch (err) {
      return res.status(500).json({
        status: '500 Internal server error',
        error: 'Error Logging in user'
      });
    }
  }
}
export default AuthController;
