// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Without params
app.get("/api", (req, res) => {
  const now = new Date();
  res.json({ unix: now.getTime(), utc: now.toUTCString() });
});

app.get("/api/:date?", function(req, res) {
  const date1 = new Date(req.params.date); // Prepare the const for a UTC req
  const date2 = new Date(Number(req.params.date)); // Prepare the const for a unix req
  // Test if it is a UTC req
  if (isNaN(date2.getTime())) {
    res.json({ unix: date1.getTime(), utc: date1.toUTCString() });
  }
  // Test if it is unix req
  else if (isNaN(date1.getTime())) {
    res.json({ unix: date2.getTime(), utc: date2.toUTCString() });
  }
  // A real invalid date
  else {
    res.json({ error: "Invalid Date" });
  }
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
