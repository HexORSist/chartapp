/**
 * This file is provided by Facebook for testing and evaluation purposes
 * only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var EventEmitter = require('events').EventEmitter;
var TickerStore = require('../stores/TickerStore');
var assign = require('object-assign');
var ChartWebAPIUtils = require('../utils/ChartWebAPIUtils');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var ChartURLS = [];
var ChartData = {};

var ChartStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  
  getChartURLS: function(tickers) {
    ChartWebAPIUtils.getChartURLS(tickers);
  },
  
  receiveChartURLS: function(_ChartURLS) {
    ChartURLS=_ChartURLS;
  },

  getChartData: function(chartURLS){
    ChartData = {
        title: {
          text: ''
        },
        xAxis: {
          categories: []
        },
        series: [{
          data: [],
          name: ''
          }]        
    };

    chartURLS.forEach(function(URL){
      ChartWebAPIUtils.getChartData(URL);
    });
  },
  
  receivedChartData: function(_ChartData){
    var _data = _ChartData.dataset.data.map(function(elm){return elm[1];})
    var _name = _ChartData.dataset.name
    var _catagories = _ChartData.dataset.data.map(function(elm){return elm[0];})
    ChartData.title.text = 'Stock Market';
    ChartData.xAxis.categories=_catagories;
    if(ChartData.series.length<=0){
      ChartData.series[0]={
        data: _data,
        name: _name
      };
    }else{
      ChartData.series.push({
        data: _data,
        name: _name
      });
    }
  },
  
  addChartData: function(_ChartData){
    var _data = _ChartData.dataset.data.map(function(elm){return elm[1];})
    var _name = _ChartData.dataset.name
    var _catagories = _ChartData.dataset.data.map(function(elm){return elm[0];})
    ChartData.title.text = 'Stock Market';
    ChartData.xAxis.categories=_catagories;
    if(ChartData.series.length<=0){
      ChartData.series[0]={
        data: _data,
        name: _name
      };
    }else{
      ChartData.series.push({
        data: _data,
        name: _name
      });
    }
  },
  
  giveChartData: function(){
    return ChartData;
  }
});

ChartStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.type) {
    
    case ActionTypes.ADD_TICKER:
      AppDispatcher.waitFor([TickerStore.dispatchToken]);
      ChartStore.emitChange();
      break;
      
    case ActionTypes.DELETE_TICKER:
      AppDispatcher.waitFor([TickerStore.dispatchToken]);
      ChartStore.emitChange();
      break;
      
    case ActionTypes.RECEIVECHART_URLS:
      ChartStore.receiveChartURLS(action.data);
      ChartStore.getChartData(ChartURLS);
      break;
      
    case ActionTypes.RECEIVEDCHART_DATA:
      ChartStore.receivedChartData(action.data);
      ChartStore.emitChange();
      break;
      
    case ActionTypes.RECEIVED_TICKERS:
      AppDispatcher.waitFor([TickerStore.dispatchToken]);
      ChartStore.getChartURLS(action.tickers);
      ChartStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = ChartStore;
