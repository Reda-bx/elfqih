const express = require('express')
const app = express()
const fetch = require('node-fetch')
const moment = require('moment')
const KEY = 'a95015e8416df0519c21af85a9cf4e02'
const url = `http://muslimsalat.com/daily.json?key=${KEY}`

app.get('/', (req, res) => {
  fetch(url)
  .then(response => response.json())
  .then(body => {
    var items = body.items
    var _items = items[0]
    var arr = Object.keys(_items).map(function (key) {return {name: key, time: _items[key]}})
    var timeNow = moment().format()
    var soon = {}
    arr.forEach((value, index) => {
      if(moment(timeNow, 'h:mm a').isBetween(moment(value.time, 'h:mm a'), moment(arr[index+1].time, 'h:mm a'))){
        res.json({text: arr[index+1].name + 'at: ' + arr[index+1].time})
      }
    })
  })
})
app.listen(3000, () => console.log('runinig...'))
