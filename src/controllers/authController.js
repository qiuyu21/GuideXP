function AuthController(User, Customer) {
  function postLogin(req, res) {
    const {email, password} = req.body;
    let user = await User.findOne({'email': email});
    if(!user) return res.status(400).send("Invalid username or password");
    

  }

  function postCreateSingleCustomer(req, res) {}

  function getForget(req, res) {}

  function getReset(req, res) {}

  function postReset(req, res) {}

  function getActivateAccount(req, res) {}

  return {
    postLogin,
    postCreateSingleCustomer,
    getForget,
    getReset,
    postReset,
    getActivateAccount,
  };
}

module.exports = AuthController;
