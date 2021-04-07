const Donation = require('../Models/Donation');
const User = require('../Models/User');
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

var stripe = require('stripe')('sk_test_2URLv8ytIlNrxnh2JzvFPhBV');



exports.get_all_donations = (req, res, next) => {
    Donation.find()
    .populate('donType', 'donName' )
    .populate('userId')    
    .exec()
    .then(docs => {
        res.status(200).json(docs);
    })
    .catch(err => {
        res.status(500).json({
            error:err
        });
    });
}


exports.create_donation = (req, res, next) => {
    const DonationModel = new Donation({
        _id: new mongoose.Types.ObjectId(),
        userId : req.body.userId,
        amount : req.body.amount,
        donType: req.body.donType,
        dateCreated: req.body.dateCreated,
    });
    DonationModel.save().then(result => {

        console.log(result);
        sendEmail().catch(err=>{
            console.log(err)
        });
        createCharge(result.amount).catch(err=>{
            console.log(err)
        });

        
    })
    .catch(err => {
        console.log(err);
        res.status(401).json({
            message: 'ERRR0r'
        });
    })
    res.status(201).json({
        message: 'Donation was created successfully'
    });
};



async function createCharge(amount){

    // String the number 00 
    var toString = String(amount) + "00";

   var newAmount =  parseInt(toString);
   console.log(parseInt(newAmount))
    const charge = await stripe.charges.create({
        amount: newAmount,
        source: 'tok_amex',
        currency: "usd",
        description: ' Test Charge Donation',
      }); 
}
// async..await is not allowed in global scope, must use a wrapper
async function sendEmail(toEmail) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'fourminutescoding@gmail.com', 
      pass: 'Anas.123', 
    },
  });

  var maillist = [
    'anas.shahwan2010@gmail.com',
   
  ];
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'fourminutescoding@gmail.com', // sender address
    to: maillist, // list of receivers
    subject: "Hello There ✔", // Subject line
    text: "Successfuly Donation", // plain text body
    html: "<b>Your Donation was made Successfully</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

