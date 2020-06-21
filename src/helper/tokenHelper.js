//This module has functions to Generate & validate token
const jwt = require("jsonwebtoken");

async function sign(data) {
  const exp = Math.floor(Date.now() / 1000) + 60 * process.env.JWT_DURATION;
  const token = await jwt.sign({ ...data, exp }, process.env.KEY, {
    algorithm: "HS256",
  });
  return token;
}

async function verify(token) {
  try {
    const decoded = await jwt.verify(token, process.env.KEY, {
      algorithms: ["HS256"],
    });
    return decoded;
  } catch (err) {
    return err;
  }
}

function decode(token) {
  const decoded = jwt.decode(token);
  return decoded;
}

module.exports = { sign, verify, decode };
