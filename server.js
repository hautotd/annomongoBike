// server.js

// set up

var express = require('express');
var app = express();
var mongoose = require('mongoose');
//var request = require('request');


// configuration 

mongoose.connect('localhost','parisvelib');

app.configure(function(){
app.use(express.static(__dirname + '/public'));
    app.use(express.logger('dev')); // log every call to the console
    app.use(express.bodyParser()); // put information from html in POST
    app.use(express.methodOverride()); // simulate DELETE and PUT 
});

app.listen(8080);
console.log('we are now connected ===== ');


var station = mongoose.model('stations', {
name : String,
    longitude : String,
    Latitude : String,
    number: Number
});



app.get('/api/stations', function(req,res){
       console.log('REQ:');
    console.log(req);
 station.find(function(err, stations){
     if(err)
         res.send(err);
     
     res.json(stations);
 });
});

app.get('/api/stations/bynumber/:stationNb', function(req,res){
   console.log('Search on Station number:');
    console.log(req.params.stationNb);
         station.find({'number':req.params.stationNb}, function(err, foundStations){
                      if(err)
                       res.send(err);
                       
                       res.json(foundStations);
                       
                      });
         });

app.get('/api/stations/byname/:stationName', function(req,res){
    if(req.params.stationName === ''){
        return;
    }
   console.log('Search on name:');
    console.log(req.params.stationName);
    
    var regex = new RegExp( req.params.stationName.toUpperCase());
         station.find({'name':regex}, function(err, foundStations){
                      if(err)
                       res.send(err);
                       
                       res.json(foundStations);
                       
                      });
         });

app.get('/api/stations/byaddress/:stationAddress', function(req, res){
 console.log('Search by address:');
    console.log(req.params.stationAddress);
var regexAddress = new RegExp( req.params.stationAddress.toUpperCase());
    station.find({'address':regexAddress}, function(err, foundStations){
    if(err)
        res.send(err);
        
        res.json(foundStations);
    });
});

/**
app.get('/api/realtime/contracts', function(req,res){
    var url = "https://api.jcdecaux.com/vls/v1/stations/8020?contract=Paris&apiKey=d57483530575fe3f6a192f44b4869aa8dc6d9390";
    
    request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
        console.log(body) // Print the json response
    } 
})
});
    **/
    
    
