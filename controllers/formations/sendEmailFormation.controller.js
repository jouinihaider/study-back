const nodemailer = require ("nodemailer")
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,

auth: {
    user:"imen.zgolli@esprit.tn",
    pass:"201SFT0734"
},
tls: {
    rejectUnauthorized: false,
}

});

let mailOption ={
    from: "imen.zgolli@esprit.tn",
    to:"zgolli.imen90@gmail.com",
    subject:"Inscription Formation",
    text:"Votre inscription à la formarion est confirmée!l"
}
transporter.sendMail(mailOption, function(err, succuess){
    if(err){
        console.log(err)
    } else {
        console.log("Message sent")
    }
})