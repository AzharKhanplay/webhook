const express = require("express");
const bodyParser = require("body-parser");
const winston = require("winston");
const serverless = require("serverless-http");

const app = express();
const port = process.env.PORT || 3000;

const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
    ]
});

router.get('/', (req, res) => {
  res.json({
    hello: 'Hi'
  })
})

app.post('/webhook', function(req, res){
   const formData = req.body;
   logger.info('received form data', formData);
   console.log('received form data', formData);
   res.status(200).send('Webhook received');
});


app.use(`/.netlify/functions/api`, router);

app.listen(port, () => { 
    console.log('listening on port'+ port); 
    logger.info('listening on port'+ port); 
});

module.exports = app;
module.exports.handler = serverless(app);