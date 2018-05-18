var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')

var server = express()

server.use(logger('dev'))
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: false}))

server.set('view engine', 'ejs')
server.use(express.static('views'))
server.set('views', __dirname+'/views')

server.get('/', function(request, response){
    //response.send('<h1>Hello!</h1>')
    response.render('home.ejs')
})

server.get('/about', function(request, response) {
    response.render('about.ejs')
})

server.get('/portfolio', function(request, response) {
    response.render('portfolio.ejs')
})

server.get('/contact', function(request, response) {
    response.render('contact.ejs')
})

server.post('/', function(request, response){
    console.log(request.body)
    
    //turn the string of names into an array of names
    var names = request.body.people
    var nameList= names.split(',')
    // create two arrrays to hold the groups of people
    var groups= [ ]
    var currentGroup= [ ]
    //loop over the list and pick people randomly, delete them from the list
    //then we're going to pair them up and put into the groups array
    while(nameList.length > 0 ) {
        var randomNumber= Math.floor(Math.random() * nameList.length)
        var randomPerson = nameList[randomNumber]
        nameList.splice(randomNumber, 1)//deltes person from list
        currentGroup.push(randomPerson)// adds them to current group
        // check to see if currentGroup holds 2 or more people
        if (currentGroup.length >= 2) {
            groups.push(currentGroup)
            currentGroup= [ ]
        }
    }
    
    response.render('results.ejs', {data: groups})
})

var port = 8080

server.listen(port, () => {
    console.log('Server listening on port' +port)
})