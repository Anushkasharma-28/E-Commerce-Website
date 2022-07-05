module.exports.init = function()
{
  const mongoose = require('mongoose');
  mongoose.connect('mongodb+srv://project:project@cluster0.ov1ip.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
  .then(function()
  {
    console.log("Database is live")
  })
  .catch(function()
  {
    console.log("Error in connection")
  })
}
