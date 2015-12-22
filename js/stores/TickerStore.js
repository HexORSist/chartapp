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
var assign = require('object-assign');
var ChartWebAPIUtils = require('../utils/ChartWebAPIUtils');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _Tickers = [];

function _addTickers(Tickers) {
  _Tickers=Tickers;
}

function _deleteTicker(ticker) {
  delete _Tickers[_Tickers.indexOf(ticker)];
}

var TickerStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  
  getAllTickers: function() {
    var tickers=_Tickers;
    return tickers;
  }
  
});

TickerStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.DELETE_TICKER:
      _deleteTicker(action.ticker);
      ChartWebAPIUtils.deleteTicker(action.ticker);
      TickerStore.emitChange();
      break;

    case ActionTypes.ADD_TICKER:
      _Tickers.push(action.ticker);
      ChartWebAPIUtils.addTicker(action.ticker);
      TickerStore.emitChange();
      break;

    case ActionTypes.RECEIVED_TICKERS:
      _addTickers(action.tickers);
      TickerStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = TickerStore;
