/*Express Setup*/
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public')); //dir for static files

/*setup html rendering instead of jade*/
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');

/*Handle all requests to '/'*/
var home = require('./routes/home');
app.get('/', home.render_home);
app.post('/', home.save_form);

/*Setup instance of app locally*/
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Print Queue listening at http://%s:%s', host, port); //provides url to where the app is running
});
