var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use("/dist", express.static(__dirname + '/dist'));
app.use("/styles", express.static(__dirname + '/styles'));
app.use("/about", express.static(__dirname + '/about'));
app.use("/cart", express.static(__dirname + '/cart'));
app.use("/check-out", express.static(__dirname + '/check-out'));
app.use("/directives", express.static(__dirname + '/directives'));
app.use("/home", express.static(__dirname + '/home'));
app.use("/giftbox", express.static(__dirname + '/giftbox'));
app.use("/images", express.static(__dirname + '/images'));
app.use("/sitemap.xml", express.static(__dirname + '/sitemap.xml'));
app.use("/item", express.static(__dirname + '/item'));
app.use("/ListOfItems", express.static(__dirname + '/ListOfItems'));
app.use("/scripts", express.static(__dirname + '/scripts'));
app.use("/services", express.static(__dirname + '/services'));
app.use("/user", express.static(__dirname + '/user'));
app.use("/views", express.static(__dirname + '/views'));
app.use("/bower_components", express.static(__dirname + '/../bower_components'));


app.get('/', function(req, res, next){
    return res.sendfile('index.html');
});

app.get('/robots.txt', function(req, res, next){
	res.type('text/plain');
    return res.sendfile('robots.txt');
});
app.get('/favicon.ico', function(req, res, next){
    return res.sendfile('favicon.ico');
});

//http.createServer(app.handle.bind(app)).listen(8080);
app.listen(8080);
