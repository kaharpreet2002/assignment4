/********************************************************************************* * 
 * WEB322 – Assignment 06 * 
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part 
 * of this assignment has been copied manually or electronically from any other source 
 * (including 3rd party web sites) or distributed to other students. 
 * Name: Harpreet Kaur  Student ID: 162196216 Date: 13-Oct-2022 
 * Online (Cyclic) Link: ________________________________________________________
 * ********************************************************************************/
const path = require('path')
const dataCollection = require("./modules/officeData");

var HTTP_PORT = process.env.PORT || 8080; 
var express = require("express"); 
var app = express();

app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'views')))
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({extended:true}));
// setup a 'route' to listen on the default url path 
app.get("/PartTimer", (req, res) => { 
    dataCollection.getPartTimers()
    .then((partTimers) => res.send(JSON.stringify(partTimers)))
    .catch((err) => {
        res.send("no part-timers found!");
    }); 
});

app.get("/employee/:num", (req, res) => { 
    dataCollection.getEmployeeByNum(req.params.num)
    .then((employee) => res.send(JSON.stringify(employee)))
    .catch((err) => {
        res.send("no employee with matching ID found!");
    }); 
});

app.get("/audio", (req, res) => { res.sendFile(__dirname + '/views/audio.html') });

app.get("/video", (req, res) => { res.sendFile(__dirname + '/views/video.html') });

app.get("/table", (req, res) => { res.sendFile(__dirname + '/views/table.html') });

app.get("/list", (req, res) => { res.sendFile(__dirname + '/views/list.html') });

app.get("/items", (req, res) => { res.sendFile(__dirname + '/views/storefront.html') });

app.get("/", (req, res) => { res.sendFile(__dirname + '/views/home.html') });

app.use(function(req, res) {
    // Invalid request
          res.json({
            error: {
              'name':'Error',
              'status':404,
              'message':'Invalid Request',
              'statusCode':404,
              'stack':'http://localhost:8080/'
            },
             message: 'Testing!'
          });
    });

// setup http server to listen on HTTP_PORT 
dataCollection.initialize()
.then(() => {
    app.listen(HTTP_PORT, ()=>{
        console.log("server listening on port: " + HTTP_PORT)
    });
})
.catch((err) => {
    res.send("some error while fetching the data!");
}); 




