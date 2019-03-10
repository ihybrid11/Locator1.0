var express = require('express')
var bodyParser = require('body-parser')
var Post = require('./models/post')


var app = express();
app.use(bodyParser.json())
app.use(require('./auth'))
app.use('/api/posts', require('./controllers/api/posts'))
app.use('/api/sessions', require('./controllers/api/sessions'))
app.use('/api/users', require('./controllers/api/users'))
app.use(require('./controllers/static'))

app.listen(5000, function(){
        console.log('Server listening on', 5000)
})
