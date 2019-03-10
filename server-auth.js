var express = require('express')
var jwt = require('jwt-simple')
var _ = require('lodash')
var app = express()
var bcrypt = require('bcrypt')
var User = require('./user')
app.use(require('body-parser').json())

var users = [{ username: 'dickeyxxx', password: '$2a$10$j0qKAGhrlx1XqXhsPj97Bu0NlsjSmYFYnJXFhteCm.imHLKiMQNva'}]
var secretKey = 'supersecretkey'

function findUserByUsername(username){
        return _.find(users, {username: username})
}

function validateUser(user, password, cb){
        bcrypt.compare(password, user.password, cb)
}

app.post('/user', function(req, res, next){
        var user = new User({ username: req.body.username })
        bcrypt.hash(req.body.password, 10, function (err, hash){
                user.password = hash
                user.save(function(err, user){
                        if (err) { throw next(err) }
                        res.send(201)
                })
        })
})

app.post('/session', function(req, res, next){
        User.findOne({ username: req.body.username }).select('password').exec(function (err, user){
                if (err) { return next(err) }
                if(!user) { return res.send(401) }
                bcrypt.compare(req.body.password, user.password, function (err, valid){
                        if (err) { return next(err) }
                        if(!valid) { return res.send(401) }
                        var token = jwt.encode({ username: user.username }, secretKey)
                        res.json(token)
                })
        })

})


app.get('/user', function(req, res){
        var token = req.headers['x-auth']

        var auth = jwt.decode(token, secretKey)
        User.findOne({ username: req.body.username }, function (err, user){
                res.json(user)
        })
})

app.listen(3000)

//curl -X POST -d '{"username": "dickeyxxx", "password":"pass"}' -H "Content-Type: application/json" localhost:3000/api/users

//curl -H "X-Auth: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImRpY2tleXh4eCJ9.0w1RshE-2k7r94VmFZeSH_JBOTAg90EecznduMwaEGc" localhost:3000/user
