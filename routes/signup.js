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
    email.addTo("kvdncuracao@gmail.com");
    email.setFrom(input.Email);
    email.setSubject("Someone sent a note from nazarenecuracao.org");

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

        if(error){
            res.json(error);
        }else {
            res.json(result);
        }
    });


});


module.exports = router;

