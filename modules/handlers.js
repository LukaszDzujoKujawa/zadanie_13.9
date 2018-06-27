var fs = require('fs');
var formidable = require('formidable');
var mv = require('mv');
var http = require('http');
var urlFile;
var readDir;

exports.upload = function(request, response) {
	console.log("Rozpoczynam obsługę żądania upload.");
	var form = new formidable.IncomingForm();
	form.parse(request, function(error, fields, files){
		fs.renameSync(files.upload.path, "a.png");
	
			response.writeHead(200, {'Content-Type': "text/html; charset=utf-8"});
			response.write("<img src='/show' />");
			response.end();
		});
}

exports.welcome = function(request, response) {
	console.log("Rozpoczynam obsługę żądania welcome.");
	fs.readFile('templates/start.html', function(err, html) {
		response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
		response.write(html);
		response.end();
	});
}

exports.error = function(request, response) {
	console.log("Nie wiem co robić.");
	response.write("404");
	response.end();
}

exports.show = function(request, response) {
	fs.readFile("a.png", "binary", function(error, file) {
		response.writeHead(200, {"Content-Type": "image/png"});
		response.write(file, "binary");
		response.end();
	});
}

exports.css = function(request, response){
	fs.readFile('css/style.css', function(error, file){
		response.writeHead(200, {"Content-Type": "text/css"});
		response.write(file, 'binary');
        response.end();
	});
}

exports.backgroundImage = function(request, response){
	fs.readFile('templates/server.jpg', function(error, file){
		response.writeHead(200, {"Content-Type": "image/jpg"});
		response.write(file, "binary");
		response.end();
	});
}