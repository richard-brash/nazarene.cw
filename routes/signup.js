/**
 * Created by richardbrash on 11/24/14.
 */

var express = require('express');

var router = express.Router();

router.get("/", function(req,res){
    res.json({Message:"Here we are"});
});

router.post("/formhandler", function(req,res){

    var input = req.body;

    //var sendgrid = require('sendgrid')("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", "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");
    var sendgrid = require('sendgrid')("richardbrash", "rbmP@ssw0rd");
    var email = new sendgrid.Email();

    email.addTo("richard@richardbrash.com");
    email.addTo("jonathan.petrus@gmail.com");
    email.setFrom(input.Email);
    email.setSubject("Information request on nazarenecuracao.com");

    email.setText(
        "First Name:" + input.FirstName + "\n" +
        "LastName Name:" + input.LastName + "\n" +
        "Email:" + input.Email + "\n" +
        "Note:" + input.Note + "\n"
    );

    email.setHtml(
        "First Name:<b>" + input.FirstName + "</b><br/>" +
        "Last Name:<b>" + input.LastName + "</b><br/>" +
        "Email:<b>" + input.Email + "</b><br/>" +
        "Note:<b>" + input.Note + "</b><br/>"
    );

    sendgrid.send(email, function(error, result){


        var email2 = new sendgrid.Email();
        email2.addTo(input.Email);
        email2.setFrom("kvdncuracao@gmail.com");
        email2.setSubject("Information request on nazarenecuracao.com");

        email2.setHtml(
            "<p>Beste " + input.FirstName + "</p>" +
            "<p>Dank u wel voor uw bericht op onze website www.nazarenecuracao.com." +
            " We hebben u bericht in goede orde ontvangen en zullen zo snel mogelijk contact met u opnemen.</p>" +
            "<p>God's zegen,</p>" +
            "<p>Kerk van de Nazarener Curaçao</p>" +
            "<br/><br/><hr/><br/><br/>" +
            "<p>Dear " + input.FirstName + "</p>" +
            "<p>Thank you for contacting Curaçao Church of the Nazarene via our website www.nazarenecuracao.com." +
            " We received your message in good order and we will repond to your message as soon as possible.</p>" +
            "<p>God's blessings,</p>" +
            "<p>Curaçao Church of the Nazarene</p>"
        );

        sendgrid.send(email2, function(error2, result2){

        });

        if(error){
            res.json(error);
        }else {
            res.json(result);
        }
    });


});


module.exports = router;

