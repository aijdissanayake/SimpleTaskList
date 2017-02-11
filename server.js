var express = require('express');
var path = require('path');
var bodyPaser = require('body-parser');

var index = require('./routes/index');
var tasks = require('./routes/tasks');

var port = 3000;

var app = express();

//view Engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

//Set Static Folder
app.use(express.static(path.join(__dirname,'client')));

//Body Parser MW
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({extended: false}));

app.use('/',index);
app.use('/api',tasks);

app.listen(port, function(){
    console.log('Server Started on Port:'+port);
});


