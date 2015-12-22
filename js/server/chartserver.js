
var Chart = require('../models/ticker.model.js');

module.exports = {
    
    getAllTickers: function(req,res){
        //console.log(req)
        Chart.findOne(function(err,data){
            //console.log(data.tickers)
            if (err) return console.error(err);
            res.send(data.tickers)
        });
    },
    
    addTicker: function(req,res){
        Chart.findOne(function(err,data){
            //console.log(data)
            if (err) return console.error(err);
            if(!data){
                Chart.create({tickers:[req.body.Ticker]},function(err,data){
                    if (err) return console.error(err); 
                    data.save();
                    res.send(req.body.Ticker);
                })
            } else {
                data.tickers.push(req.body.Ticker);
                data.save();
                res.send(req.body.Ticker);
            }
        });
    },
    
    deleteTicker: function(req,res){
        Chart.findOne(function(err,data){
            if (err) return console.error(err);
            var idx = data.tickers.indexOf(req.body.Ticker);
            data.tickers.splice(idx,1);
            data.save();
            //console.log(data.tickers);
        });
    },

    createChartURLS: function(charts) {
        var baseURL = "https://www.quandl.com/api/v3/datasets/WIKI/";
        var currdate = new Date()
        var yearago = (currdate.getFullYear()-1)+'-'+(currdate.getMonth()+1)+'-'+currdate.getDate();
        
        var URLS = charts.map(function(elm){
            return baseURL+elm+'.json?'+'&start_date='+yearago+'&column_index=4&collapse=weekly';
        });
        return JSON.stringify(URLS[0])
    }
};