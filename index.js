/**
 * Created by youxiachai on 14-3-24.
 */
/**
 * Created by youxiachai on 14-3-18.
 */
//
//var NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : 'localhost';
//
//var config = require('./config/upload-' + NODE_ENV);


var express = require('express'),
    http = require('http');

var upload = require('jquery-file-upload-middleware');

// configure upload middleware
//upload.configure({
//    uploadDir: __dirname + '/public/uploads',
//    uploadUrl: '/upload'
//});


var app = express();

app.set('port', 5001);

app.use(express.cookieParser('testFileupload'));

app.use(express.logger('dev'));

app.use(express.cookieSession());


app.use(express.static(__dirname + '/public/'));

app.use('/upload', function (req, res, next) {
    // imageVersions are taken from upload.configure()
    console.log('upload');
    upload.fileHandler({
        uploadDir: function () {
            return __dirname + '/public/upload';
        },
        uploadUrl: function () {
            return '/upload';
        }
    })(req, res, next);
});


app.use(express.urlencoded())
app.use(express.json())

upload.on('begin', function (fileInfo) {
    console.log('begin ->' + JSON.stringify(fileInfo));

});
upload.on('abort', function (fileInfo) {
    console.log('abort ->' + JSON.stringify(fileInfo));
});
upload.on('end', function (fileInfo) {
    console.log('end ->' + JSON.stringify(fileInfo));
});
upload.on('delete', function (fileInfo) {
    console.log('delete ->' + JSON.stringify(fileInfo));
});
upload.on('error', function (e) {
    console.log('err' + e.message);
});


http.createServer(app).listen(app.get('port'), function () {
    console.log('env: ' + process.env.NODE_ENV);
    console.log('Express server listening on port ' + app.get('port'));
});
