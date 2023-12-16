// init project
var express = require('express');
var app = express();
require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", (req, res) => {
  res.json({greeting: 'hello API'});
});

app.get("/api", (req, res) => {
  let date = new Date();
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

app.get("/api/:date", (req, res) => {
  let inputDate = req.params.date;
  let utc = new Date(inputDate);
  let unix = utc.getTime();

  if (!isNaN(inputDate)) { // check if input is a number
    unix = parseInt(inputDate);
    utc = new Date(parseInt(inputDate));
    res.json({ unix: unix, utc: utc.toUTCString() });
  }
  else if (!isNaN(unix))
    res.json({ unix: unix, utc: utc.toUTCString() });
  else
    res.json({ error: "Invalid Date" });
});




// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, ()=> {
  console.log('Your app is listening on port ' + listener.address().port);
});

const port = process.env.PORT || 3000;
