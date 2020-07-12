//List of HTTP status codes that we are using in this project
module.exports = Object.freeze({
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  NOT_ALLOWED: 405,
  INTERNAL_SERVER_ERROR: 500,
});


//Don't use this file, use responseHelper.js, this file will eventually get deleted soon.