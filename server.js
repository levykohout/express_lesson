var express=require('express'); //named module that we can use to let us use the express library
var bodyParser=require('body-parser'); //body parser library installed
var path =require('path');

var app =express(); //create new application that we can do things with

app.use(function(req, res, next){
  console.log('Got a request');
  next();
});

app.use(bodyParser.urlencoded({extended:true})); //app.use - returns a function that calls the handle/middleware function in every request received
 //takes a urlencoded
 app.post('/', function(req,res){
   console.log('req.body', req.body);
   res.sendStatus(200); //200 -299 successful response but has different message and action. 300-399 redirects,not modified, 400-499 client error
 });                    //500-599 server error

app.get('/', function(req, res){   //takes request from the specified path "localhost:3000/"and handler/middleware function
  console.log('Received a request at',new Date());

    var filepath =path.join(__dirname, 'public/views/index.html'); //__dirname is the folder this file lives in combines file path
    res.sendFile(filepath); //another send response method.
    console.log(filepath);
    // res.send('Hello World!'); //sending response back to the client .
});
app.get('/kittens',function(req,res){
  console.log('Query params:',req.query); //.requery gives us an object of request parameters
  if(req.query.age>2){
    res.send('MEOW!');
  }else{                      //only send respond one time or else it will send an error. Also don't forget to send a response.
      res.send('meow');
  }
});

//route for creating new songs
var songs=[];
app.post('/songs', function(req, res){  //post sends information to the server
console.log('req.body',req.body);
  songs.push(req.body); //adds new songs to the server
console.log('songs',songs);
  res.sendStatus(200); //sends message to the client indicating that the request was successful
});

//route for retrieving new songs
app.get('/songs', function(req,res){
  res.send(songs);

});

//middleware for serving static file
app.use(express.static('public')); //give path to the folder you want to be available public relevant to the server.js directory
                                    //static file are files that doesn't change while the page is loaded. makes public the inside to the folder specified.


//express automatically parse for you but doesn't automatically parse the body
app.listen(3000); //listen for request at port 3000
