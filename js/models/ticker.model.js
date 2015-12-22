

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost:27017/charts');

/*var tickerSchema = new Schema({
  ticker: String
});*/

var chartSchema = new Schema(
  {tickers: []},
  {collection: 'theChart',versionKey: false});

module.exports = mongoose.model('chart', chartSchema);