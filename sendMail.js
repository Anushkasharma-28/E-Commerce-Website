const mailjet = require('node-mailjet');

const trasporter  = mailjet.connect(
    "798a2ef2ac8eab33a0c812b07eb147d8", 
	"c99c4b6ed4bdb74dfe21ca693559e9cd"
)

module.exports = function sendMail( email, title, body, html, callback )
{
  const request = trasporter.post('send').request({
  FromEmail: 'anushkasharma0223@gmail.com',
  FromName: 'Magical ecom, where everything is costly',
  Subject: title,
  'Text-part': body ,
  'Html-part': html,
  Recipients: [{ Email: email }],
})
request
  .then(result => {
    callback();
  })
  .catch(err => {
    callback("error occured")
  })
}
