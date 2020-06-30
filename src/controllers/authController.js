const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwthelper = require("../helper/tokenHelper");
const { status_codes, error_codes } = require("../helper/responseHelper");

function AuthController(User, Customer) {
  /**
   * Login route handler
   */
  async function postLogin(req, res) {
    const { email, password } = req.body;
    const msg = {};
    let user = await User.findOne({ Email: email });
    if (!user) {
      msg.code = error_codes.ERROR_INPUT_DATA;
      msg.message = "Invalid username or password";
      return res
        .status(status_codes.BAD_REQUEST)
        .send(msg);
    }
    if (!user.Active) {
      msg.code = error_codes.ERROR_USER_NOT_ACTIVE;
      msg.message = "User is not active";
      return res.status(status_codes.FORBIDDEN).send(msg);
    }
    const match = await bcrypt.compare(password, user.Password);
    if (!match) {
      msg.code = error_codes.ERROR_INPUT_DATA;
      msg.message = "Invalid username or password"
      return res
        .status(status_codes.BAD_REQUEST)
        .send(msg);
    }

    const token = await jwthelper.sign(user._doc);
    msg.message = {};
    msg.message.token = token;
    res.status(status_codes.OK).send(msg);
  }

  /**
   *User forgot password and get a reset password link
   */
  async function postForget(req, res) {
    // const { email } = req.body;
    // let user = await User.findOne({ Email: email });
    // if (!user) return res.status(status_codes.NO_CONTENT).send();
    // if (!user.Acitve)
    //   return res.status(status_codes.FORBIDDEN).send("User is not active");
    //generate a hash
    //check the last forgot date
  }

  /**
   *
   */
  function getReset(req, res) { }

  function postReset(req, res) { }

  function postActivate(req, res) { }

  return {
    postLogin,
    postForget,
    getReset,
    postReset,
    postActivate,
  };
}

module.exports = AuthController;
