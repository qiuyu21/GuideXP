/**
 * Http Status Codes
 */
const OK = 200;
const NOT_MODIFIED = 304;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const NOT_FOUND = 404;
const NOT_ACCEPTABLE = 406;
const GONE = 410;
const ENHANCE_YOUR_CALM = 420;
const UNPROCESSABLE_ENTITY = 422;
const TOO_MANY_REQUESTS = 429;
const INTERNAL_SERVER_ERROR = 500;
const BAD_GATEWAY = 502;
const SERVICE_UNAVAILABLE = 503;
const GATEWAY_TIMEOUT = 504;

/**
 * Error Codes
 */
const ERROR_AUTHENTICATION = 1;  //401
const ERROR_AUTHORIZATION = 2; //403
const ERROR_TOKEN = 3; //403 

const ERROR_URL_PARAMETER = 10; //400
const ERROR_URL_QUERY = 11; //400
const ERROR_ID_STRING = 12; //404

const ERROR_USER_EXIST = 22;     //403 
const ERROR_USER_NOT_ACTIVE = 23;
const ERROR_USER_NOT_FOUND = 24; //404 

const ERROR_INPUT_PARAMETER = 40; //403
const ERROR_INPUT_FORMAT = 41; //400
const ERROR_INPUT_DATA = 42; //400

const ERROR_EXHIBITION_NOT_FOUND = 50; //404
const ERROR_EXHIBIT_NOT_FOUND = 51; //404

const ERROR_FREE_TRIAL_EXPIRE = 100;    //403
const ERROR_SUBSCRIPTION_EXPIRE = 101; //403


const status_codes = Object.freeze({
    OK,
    NOT_MODIFIED,
    BAD_REQUEST,
    UNAUTHORIZED,
    FORBIDDEN,
    NOT_FOUND,
    NOT_ACCEPTABLE,
    GONE,
    ENHANCE_YOUR_CALM,
    UNPROCESSABLE_ENTITY,
    TOO_MANY_REQUESTS,
    INTERNAL_SERVER_ERROR,
    BAD_GATEWAY,
    SERVICE_UNAVAILABLE,
    GATEWAY_TIMEOUT
})

const error_codes = Object.freeze({
    ERROR_AUTHENTICATION,
    ERROR_AUTHORIZATION,
    ERROR_TOKEN,
    ERROR_URL_PARAMETER,
    ERROR_URL_QUERY,
    ERROR_ID_STRING,
    ERROR_USER_EXIST,
    ERROR_USER_NOT_ACTIVE,
    ERROR_USER_NOT_FOUND,
    ERROR_INPUT_PARAMETER,
    ERROR_INPUT_FORMAT,
    ERROR_INPUT_DATA,
    ERROR_FREE_TRIAL_EXPIRE,
    ERROR_SUBSCRIPTION_EXPIRE,
    ERROR_EXHIBITION_NOT_FOUND,
    ERROR_EXHIBIT_NOT_FOUND
});


module.exports = {
    status_codes,
    error_codes
}