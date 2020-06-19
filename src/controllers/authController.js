function AuthController(User, Customer) {
  function postLogin(req, res) {}

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
