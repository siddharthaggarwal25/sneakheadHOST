const nodemailer = require("nodemailer");
exports.ConfigMail = () => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: "fakeuseruser540@gmail.com",
      pass: "vvvm vbve vxab hpxz",
    },
  });
  return transporter;
};
