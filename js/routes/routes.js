
var chartserver = require('../server/chartserver');
var path = process.cwd();

//var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var COOKIENAME=''

function cookiecheck(req,res){
    
};

module.exports = function (app) {

    //var clickHandler = new ClickHandler();

    app.route('/')
        .get(function (req, res) {
            //console.log(req.cookies);
            res.cookie('test' , '1234', {maxAge : 60*60*24*365});
            res.sendFile(path + '/index.html');
        });
        
    app.route('/getChartURLS/')
        .post(function (req, res) {
            //console.log(req.cookies);
            //console.log(req.cookies)
            res.send(chartserver.createChartURLS(req,res));
        });
        
    app.route('/deleteTicker/')
        .post(function (req, res) {
            //console.log(req.cookies);
            //console.log(req.cookies)
            chartserver.deleteTicker(req,res);
        });

        
    app.route('/addTicker/')
        .post(function (req, res) {
            //console.log(req.cookies);
            //console.log(req.cookies)
            chartserver.addTicker(req,res);
        });

    app.route('/getAllTickers/')
        .get(function (req, res) {
            chartserver.getAllTickers(req,res);
        });

};