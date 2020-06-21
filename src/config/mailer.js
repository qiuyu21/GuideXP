const nodemail = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  post: 2525,
  auth: {
    user: "e596ec61f70a2d",
    pass: "96a455c9744dcd",
  },
});

const msg = {
  from: '"info@guidexp.me',
  to: "",
  subject: "",
  html: "",
};

module.exports = { nodemail, transporter, msg };
