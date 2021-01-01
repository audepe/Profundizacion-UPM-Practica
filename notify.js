var nodemailer = require("nodemailer");

function createFromTemplate(url) {
  return `Pagina ${url} ha cambiado`;
}

function notify(email, url) {
  var transporter = nodemailer.createTransport({
    name: "monitor-tu-pagina.com",
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "abbie.kassulke9@ethereal.email",
      pass: "EwFfk1vdXsNSkNezKj",
    },
  });

  var mailOptions = {
    from: "Monitor Tu Pagina",
    to: email,
    subject: "Pagina Cambiada",
    text: createFromTemplate(url),
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent: %s", info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
  });
}

// notify("giraw36074@aomrock.com", "www.google.com");
