// require our mailgun dependencies
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

// auth with our mailgun API key and domain
const auth = {
  auth: {
    api_key: process.env.MAILGUN_API_KEY,
    domain: process.env.EMAIL_DOMAIN
  }
}

// create a mailer
const nodemailerMailgun = nodemailer.createTransport(mg(auth));

// export our send mail function
module.exports.sendMail = (user, req, res) => {
  nodemailerMailgun.sendMail({
    from: 'no-reply@atleastzero.codes',
    to: user.email, // An array if you have multiple recipients.
    subject: 'Hedgie acquired!',
    template: {
      name: 'email.handlebars',
      engine: 'handlebars',
      context: user
    }
  // Mail sent, redirect to the purchased pet's page
  }).then(info => {
    console.log('Response: ' + info);
    res.redirect(`/pets/${req.params.id}`);
  // Catch error and redirect to the purchased pet's page
  }).catch(err => {
    console.log('Error: ' + err);
    res.redirect(`/pets/${req.params.id}`);
  });
}