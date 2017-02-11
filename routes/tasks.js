var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://achala:achala@ds149069.mlab.com:49069/mytasklist_achala',['tasks']);

//Get all tasks
router.get('/tasks',function(req, res, next){
    db.tasks.find(function(err,tasks){
        if (err) {
           res.send(err); 
        }
        res.json(tasks);
        // var titles = [];
        // tasks.forEach(function(element) {
        //     titles.push(element["title"]);
        // }, this);
        // res.json(titles);
    });
});

//get single task
router.get('/task/:id',function(req, res, next){
    db.tasks.findOne({_id:mongojs.ObjectId(req.params.id)},function(err, task){
        if (err) {
           res.send(err); 
        }
        res.json(task);
    });
});

//test folders inside views
router.get('/test',function(req, res, next){
    res.render('client/home.html');
});

//save task
router.post('/task',function(req, res, next){
    var task = req.body;
    if(!task.title || !(task.isDone + '')){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.tasks.save(task, function(err, task){
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }
});

//delete task
router.delete('/task/:id',function(req, res, next){
    db.tasks.remove({_id:mongojs.ObjectId(req.params.id)},function(err, task){
        if (err) {
           res.send(err); 
        }
        res.json(task);
    });    
});

//Update task
router.put('/task/:id',function(req, res, next){
    var task = req.body;
    var updatedTask = {};
    
    if(task.isDone){
        updatedTask.isDone = task.isDone;
    }
    if(task.title){
        updatedTask.title = task.title;
    }
    if(!updatedTask){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.tasks.update({_id:mongojs.ObjectId(req.params.id)},updatedTask,{},function(err, task){
        if (err) {
           res.send(err); 
        }
        res.json(task);
    });
    }
        
});

module.exports = router;
