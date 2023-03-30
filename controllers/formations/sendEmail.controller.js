const nodemailer = require('nodemailer');
      let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "9a66621e09824f",
      pass: "ecfa9d448b4097"
    },
    tls : {
        rejectUnauthorized: false,
    },
  });
  message = {
    from: "from@email.com",
    to: "to@email.com",
    subject: "Subject",
    text: "Votre inscription à la formarion est confirmée!"
}
   
transporter.sendMail(message, function (error, response) {
    if (error) {
     console.log(error);
    } else {
     console.log('Message sent: ok');
    }
    transporter.close(); 
   });