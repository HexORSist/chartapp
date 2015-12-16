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

function _addCharts(Charts) {

  
}


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

  getChartURLS: function() {
    ChartWebAPIUtils.getChartURLS();
    //ChartURLS=["https://www.quandl.com/api/v3/datasets/WIKI/AAPL.json?order=asc&exclude_column_names=true&start_date=2012-11-01&end_date=2012-11-30&column_index=4&collapse=weekly&transformation=rdiff"];
  },
  
  receiveChartURLS: function(_ChartURLS) {
    ChartURLS=_ChartURLS;
  },

  getChartData: function(chartURLS){
    ChartWebAPIUtils.getChartData(chartURLS);
  },
  
  receivedChartData: function(_ChartData){
    
    ChartData = {
        xAxis: {
          categories: _ChartData.dataset.data.map(function(elm){
                        return elm[0];
                      })
        },
        series: [{
          data: _ChartData.dataset.data.map(function(elm){
                  return elm[1];
                })
          }]        
    };
    console.log(ChartData);
    //ChartWebAPIUtils.getChartData(ChartData);
  }
  

});

ChartStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.DELETE_TICKER:
      //console.log(TickerStore.dispatchToken)
      AppDispatcher.waitFor([TickerStore.dispatchToken]);
      ChartStore.getChartURLS();
      ChartStore.emitChange();
      break;
      
    case ActionTypes.RECEIVECHART_URLS:
      ChartStore.receiveChartURLS(action.data);
      ChartStore.getChartData(ChartURLS);
      break;
      
    case ActionTypes.RECEIVEDCHART_DATA:
      //console.log(action.data)
      ChartStore.receivedChartData(action.data);
      break;
      
    
      
      
    default:
      // do nothing
  }

});

module.exports = ChartStore;
