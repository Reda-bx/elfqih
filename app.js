var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var fetch = require('node-fetch')
var moment = require('moment-timezone')

var KEY = 'a95015e8416df0519c21af85a9cf4e02'
var url = 'http://muslimsalat.com/rabat/daily.json?key='+KEY

app.use(bodyParser.json())

app.post('/', (req, res) => {
  fetch(url)
  .then(response => response.json())
  .then(body => {
    // TOOD: add username
    // get items
    var _items = body.items[0]
    var arr_of_items = Object.keys(_items).map(function (key) {return {name: key, time: _items[key]}})
    arr_of_items.shift()
    arr_of_items.map(value => value.time = moment(value.time, 'h:mm a').format('HH:mm'))
    var timeNow = moment().tz('Africa/Casablanca').format('HH:mm')
    var soon = arr_of_items.filter((value) => value.time > timeNow)
    var _soon = soon[0]
    var text = 'Hi , Salat *' + _soon.name + '* in *'+ moment(timeNow, 'HH:mm').to(moment(soon[0].time, 'HH:mm'), true) + '*. Adan at: *' + _soon.time +'*'
    res.send({text: text})
  })
  .catch(err => res.json({error: err}))
})
app.listen(process.env.PORT || 3000, () => console.log('runinig...'))
