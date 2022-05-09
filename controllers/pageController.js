const nodemailer = require('nodemailer');

exports.getIndexPage = (req, res) => {
    res.status(200).render('index',{
        page_name: "index"
    });
  }

  exports.getAboutPage = (req, res) => {
    res.status(200).render('about',{
        page_name:"about"
    });
  }

  exports.getRegisterPage = (req, res) => {
    res.status(200).render('register',{
        page_name:"register"
    });
  }

  exports.getLoginPage = (req, res) => {
    res.status(200).render('login',{
        page_name:"login"
    });
  }

  exports.getContactPage = (req, res) => {
    res.status(200).render('contact',{
        page_name:"contact"
    });
  }

  exports.sendEmail = async (req, res) => {
    try {
      const outputMessage = `
    <h1>Mail Detail </h1>
    <ul>
    <li>Name: ${req.body.name} </li>
    <li>Email:${req.body.email} </li>
    </ul>
    <h1>Message</h1>
    <p>${req.body.message}</p>
    `
    // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "test@gmail.com", // gmail account
      pass: "123", // gmail password
    },
  });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Smart Edu Contact Form" <test@gmail.com>', // sender address
    to: "bar@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    html: outputMessage, // html body
  });

  req.flash("success", "We received your message successfully ;)");
  res.status(200).redirect('/contact');

    } catch (error) {
      req.flash("error", `Something happened :( Error : ${error}`);
      res.status(400).redirect('/contact');
    }
    
  }