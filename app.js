const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https =require('https');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',function(req,res){
    res.sendFile(__dirname+'/signup.html')
})

app.post('/',function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data ={
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);

    const url = 'https://us6.api.mailchimp.com/3.0/lists/50a523fbcc';
    const option = {
        method: "POST",
        auth: "lokesh:0d25568ea169d6b331b3af681f96dd2c-us6",
    };

    const request = https.request(url, option , function(response){

        if(response.statusCode ===200){
            res.sendFile(__dirname +'/success.html')
        }else{
            res.send(__dirname +'/failure.html')
        }


        response.on('data',function(data){
            console.log(JSON.parse(data));
        })
    });

    request.write(jsonData);
    request.end();
});

app.post('/failure', function(req,res){
    res.redirect('/');
})

app.listen(3000,function(){
    console.log('Server is running on port 3000')
})


//API KEY
//0d25568ea169d6b331b3af681f96dd2c-us6

//List ID
//50a523fbcc