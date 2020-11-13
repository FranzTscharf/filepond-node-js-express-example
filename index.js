var hogan = require('hogan-express');
var express = require('express');
var axios = require('axios');
var url_parser = require('url');
var cors = require('cors');
const bodyParser = require("body-parser");
var multer = require("multer");

//for space image upload
var upload = multer({ dest: require('path').join(__dirname, '/public/media') });

var app = express();
//Here we are configuring express to use body-parser as middle-ware.

//This is CORS-enabled for all origins!
app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.NODEJS_PORT || 3000;
var server = app.listen(port, function () {
  var host = server.address().address;
  console.log('NodeJS listening at ', host, port);
});

app.set('view engine', 'html');
app.set('views', require('path').join(__dirname, '/public/view'));
app.engine('html', hogan);

app.use(express.static(require('path').join(__dirname, "public")));

app.post("/image/upload", upload.array("images", 12), function(req, res, next) {
    // req.files is array of `photos` files
    console.log(req.files);
    // req.body will contain the text fields, if there were any
    console.log(req.body);
    res.send([req.files[0].filename]);
});
