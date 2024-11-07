const Mailgen = require('mailgen');
exports.SignUpMail=(name)=>{
    const MailGenerator = new Mailgen({
        theme: "default",
        product : {
            name: "Sneak Head",
            link:"http://localhost:5173/signup"
        }
    })

    const response = {
        body: {
          name: name,
          intro: "Thanks for being a part of SneakHead",
          action:[
            {
            instructions: "Shop best sneakers from SNEAK HEADS at best price",
            button: {
              color: "#22BC66", 
              text :"Thanks ",
            },
          },
          {
            instructions:" ",
          }
        ],
          outro: "If you did not like , please ignore this email.",
        },
      };

    const mail = MailGenerator.generate(response);
    return mail;

}
