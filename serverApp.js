global.l = console.log

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const ROOT = __dirname + '/public'
const IMAGES = ROOT + '/images/'

var imageFiles = [];
fs.readdir(IMAGES, (err, files) => {
	if(err) {
		console.log('Error : ', err)
		return
	} 

	files.forEach(file => {
		imageFiles.push(file)
	})
})

//static files
app.use(express.static(__dirname + '/public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.listen(3000)

app.post('/nextImg', (req, res) => {
	var yetCount = req.body.count

	if(imageFiles[yetCount]){
		res.writeHead(200)
		res.end(/images/ + imageFiles[yetCount])
	} else {
		res.writeHead(204)
		res.write('no images else')
		res.end('')
	}
})
