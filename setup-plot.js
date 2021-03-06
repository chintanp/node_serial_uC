var Signal = require('random-signal')
  , config = require("./config.json") // put your user credentials in config.json
  , apiKey = config['apiKey']
  , username = config['user']
  , token = config['token']
  , Plotly = require('plotly')(username, apiKey);

  // , username = ''
  // , apikey = ''

// build a data object - see https://plot.ly/api/rest/docs for information
var data = {
    'x':[]   // empty arrays since we will be streaming our data to into these arrays
  , 'y':[]
  , 'type':'scatter'
  , 'mode':'lines+markers'
  , marker: {
      color: "rgba(31, 119, 180, 0.96)"
  }
  , line: {
      color:"rgba(31, 119, 180, 0.31)"
  }
  , stream: {
      "token": token
    , "maxpoints": 100
  }
}

// build you layout and file options
var layout = {
    "filename": "streamSimpleSensor"
  , "fileopt": "overwrite"
  , "layout": {
      "title": "streaming mock sensor data"
  }
  , "world_readable": true
}

// IF you have not signed up for Plotly you can do so using https://plot.ly
// or do so below.
if (username === '' || apiKey === '') {
    // put in your desired username and email
    plotly.signup('yourUserName','yourEmail', function (err, resp) {
        if (err) console.log(err)
        else console.log(resp)
        process.exit()
    })
}
else {

    /*
     * Call plotly.plot to set the file up.
     * If you have included a streaming token
     * you should get a "All Streams Go!" message
     */
    var sigOpts = {sep: "\n", tdelta: 100}

    Plotly.plot(data, layout, function (err, resp) {
        if (err) return console.log("ERROR", err)

        console.log(resp)

        var plotlystream = Plotly.stream(token, function () {})
        var signalstream = Signal(sigOpts)

        console.log(signalstream)

        plotlystream.on("error", function (err) {
            signalstream.destroy()
        })

        // Okay - stream to our plot!
        signalstream.pipe(plotlystream)



    })



}