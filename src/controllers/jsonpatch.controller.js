import jsonpatch from 'jsonpatch';
/**
 *Contains Auth Controller
 *
 * @class JsonPatchController
 */
class JsonPatchController {
  /**
   * Implements Json patch.
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @memberof AuthController
   * @returns {JSON} - A JSON success response.
   */
  static async jsonPatch(req, res) {
    try {
      const { doc, patch } = req.body;
      const result = jsonpatch.apply_patch(doc, patch);
      const response = {
        result
      };
      return res.status(200).json({
        status: 'success',
        data: response
      });
    } catch (err) {
      return res.status(500).json({
        status: '500 Internal server error',
        error: 'Error patching document'
      });
    }
  }
}
export default JsonPatchController;
