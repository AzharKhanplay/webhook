const express = require("express");
const winston = require("winston");
const serverless = require("serverless-http");

const app = express();
const port = process.env.PORT || 3000;

const router = express.Router();

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
    ],
});
  

app.use(express.json());


router.get('/', (req, res) => {
  res.json({
    hello: 'Hi'
  })
});

router.post('/webhook', function(req, res){
   const formData = req.body;
   logger.info('received form data', formData);
   console.log('received form data', formData);
   res.status(200).send('Webhook received');
});


app.use(`/.netlify/functions/api`, router);


module.exports = app;
module.exports.handler = serverless(app);