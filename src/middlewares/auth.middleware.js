import jwt from 'jsonwebtoken';

/**
   * Validates token and returns token payload.
   * @param {Response} req - Response object.
   * @param {Request} res - The payload.
   * @param {Next} next - The express next function.
   * @returns {JSON} - A JSON success response.
   */
export const validateToken = (req, res, next) => {
  const { token: headerToken = null } = req.headers;
  const { token: bodyToken = null } = req.body;
  const token = bodyToken || headerToken;
  if (!token) {
    return res.status(401).json({
      status: '401 unauthorized',
      error: 'Token not found'
    });
  }

  jwt.verify(token, process.env.SECRET = 'alternativeSecret', (error, result) => {
    if (error) {
      return res.status(401).json({
        status: '401 Unauthorized',
        error: 'Access token is Invalid'
      });
    }
    req.payLoad = result.data;
    next();
  });
};

/**
   * Validates login parameters
   * @param {Request} req - Response object.
   * @param {Response} res - The payload.
   * @param {Next} next - The express next function.
   * @returns {JSON} - A JSON success response.
   */
export const validateLogin = (req, res, next) => {
  const { username, password } = req.body;
  if (username && password) {
    if (username.trim() && password.trim()) return next();
  }
  res.status(400).json({
    status: '400 Invalid Request',
    error: 'username/password is required'
  });
};
