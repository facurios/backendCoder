const twilio = require('twilio');
const dotenv = require('dotenv');

dotenv.config();


console.log(process.env.TWILIO_SID, '  ',process.env.TWILIO_TOKEN )
const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_TOKEN
console.log(accountSid, '  ', authToken)
const client = twilio(accountSid,authToken)

module.exports = client