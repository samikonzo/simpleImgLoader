const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const ROOT = __dirname + '/public'
const IMAGES = ROOT + '/images/'

var counter = 0;
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





app.use(express.static(__dirname + '/public'))

app.get('/nextImg', (req, res) => {
	console.log('next img needed')

	if(counter > imageFiles.length - 1){
		counter = 0;
	}

	var currentFile = imageFiles[counter++]

	res.end(/images/ + currentFile)
	
})

app.listen(3000)