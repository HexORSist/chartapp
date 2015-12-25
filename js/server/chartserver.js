
var Chart = require('../models/ticker.model.js');

module.exports = {
    
    getAllTickers: function(req,res){
        Chart.findOne(function(err,data){
            if (err) return console.error(err);
            res.send(data.tickers)
        });
    },
    
    addTicker: function(req,res){
        Chart.findOne(function(err,data){
            if (err) return console.error(err);
            if(!data){
                Chart.create({tickers:[req.body.Ticker]},function(err,data){
                    if (err) return console.error(err); 
                    data.save();
                    res.send(data.tickers);
                })
            } else {
                data.tickers.push(req.body.Ticker);
                data.save();
                res.send(data.tickers);
            }
        });
    },
    
    deleteTicker: function(req,res){
        Chart.findOne(function(err,data){
            if (err) return console.error(err);
            var idx = data.tickers.indexOf(req.body.Ticker);
            data.tickers.splice(idx,1);
            data.save();
            res.send(data.tickers);
        });
    },

    createChartURLS: function(req,res) {
        var baseURL = "https://www.quandl.com/api/v3/datasets/WIKI/";
        var currdate = new Date()
        var yearago = (currdate.getFullYear()-1)+'-'+(currdate.getMonth()+1)+'-'+currdate.getDate();
        var apikey = '&api_key=xxDEpf1s4fpTji_R1waZ';
        
        var URLS = req.body.ChartURLS.map(function(elm){
            return baseURL+elm+'.json?'+'start_date='+yearago+'&column_index=4&collapse=weekly&order=asc'+apikey;
        });
        return JSON.stringify(URLS)
    }
};