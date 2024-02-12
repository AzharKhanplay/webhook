const express = require("express");
const bodyParser = require("body-parser");
const winston = require("winston");

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
    ]
})

app.post('/webhook', function(req, res){
   const formData = req.body;
   logger.info('received form data', formData);
   console.log('received form data', formData);
   res.status(200).send('Webhook received');
});

app.listen(port, () => { 
    console.log('listening on port'+ port); 
    logger.info('listening on port'+ port); 
});