
var chartserver = require('../server/chartserver');
var path = process.cwd();

module.exports = function (app) {

    app.route('/')
        .get(function (req, res) {
            res.sendFile(path + '/index.html');
        });
        
    app.route('/getChartURLS/')
        .post(function (req, res) {
            res.send(chartserver.createChartURLS(req,res));
        });
        
    app.route('/deleteTicker/')
        .post(function (req, res) {
            chartserver.deleteTicker(req,res);
        });

        
    app.route('/addTicker/')
        .post(function (req, res) {
            chartserver.addTicker(req,res);
        });

    app.route('/getAllTickers/')
        .get(function (req, res) {
            chartserver.getAllTickers(req,res);
        });

};