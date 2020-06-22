const HttpStatus = require("../helper/httpHelper");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwthelper = require("../helper/tokenHelper");

function AuthController(User, Customer) {
  /**
   * Login route handler
   */
  async function postLogin(req, res) {
    const { email, password } = req.body;
    let user = await User.findOne({ Email: email });
    if (!user)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send("Invalid username or password");
    if (!user.Active)
      return res.status(HttpStatus.FORBIDDEN).send("User is not active");
    const match = await bcrypt.compare(password, user.Password);
    if (!match)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send("Invalid username or password");

    const token = await jwthelper.sign(user._doc);
    res.status(HttpStatus.OK).send(token);
  }

  /**
   *User forgot password and get a reset password link
   */
  async function postForget(req, res) {
    const { email } = req.body;
    let user = await User.findOne({ Email: email });
    if (!user) return res.status(HttpStatus.NO_CONTENT).send();
    if (!user.Acitve)
      return res.status(HttpStatus.FORBIDDEN).send("User is not active");
    //generate a hash
    //check the last forgot date
  }

  /**
   *
   */
  function getReset(req, res) {}

  function postReset(req, res) {}

  return {
    postLogin,
    postForget,
    getReset,
    postReset,
  };
}

module.exports = AuthController;
