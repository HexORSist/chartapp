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
//var ChatMessageUtils = require('../utils/ChatMessageUtils');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
//var ChartActionCreators = require('../actions/ChartActionCreators');

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var _Tickers = [];

function _addTickers(Tickers) {
  //alert(Tickers);
  /*Tickers.forEach(function(tickers) {
    if (!_messages[message.id]) {
      _messages[message.id] = ChatMessageUtils.convertRawMessage(
        message,
        ThreadStore.getCurrentID()
      );
    }
    _Tickers.push(tickers);
  });*/
  _Tickers=Tickers;
}

function _markAllInThreadRead(threadID) {
  for (var id in _messages) {
    if (_messages[id].threadID === threadID) {
      _messages[id].isRead = true;
    }
  }
}

function _deleteTicker(ticker) {
  delete _Tickers[_Tickers.indexOf(ticker)];
}



var TickerStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  get: function(id) {
    return _messages[id];
  },

  getAll: function() {
    return _messages;
  },

  /**
   * @param {string} threadID
   */
  getAllForThread: function() {
    var tickers=_Tickers;
    /*var threadMessages = [];
    for (var id in _messages) {
      if (_messages[id].threadID === threadID) {
        threadMessages.push(_messages[id]);
      }
    }
    threadMessages.sort(function(a, b) {
      if (a.date < b.date) {
        return -1;
      } else if (a.date > b.date) {
        return 1;
      }
      return 0;
    });*/
    return tickers;
  },

  /*getAllForCurrentThread: function() {
    return this.getAllForThread(ThreadStore.getCurrentID());
  }*/

});

TickerStore.dispatchToken = AppDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.DELETE_TICKER:
      _deleteTicker(action.ticker);
      TickerStore.emitChange();
      break;

    case ActionTypes.ADD_TICKER:
      _Tickers.push(action.ticker);
      TickerStore.emitChange();
      //setTimeout(ChartStore.emitChange,1000);
      //ChartActionCreators.getChartURLS();
      break;

    case ActionTypes.ADD_TICKERS:
      //console.log(action);
      _addTickers(action.Tickers);
      //AppDispatcher.waitFor([ThreadStore.dispatchToken]);
      //_markAllInThreadRead(ThreadStore.getCurrentID());
      //AppDispatcher.waitFor([ChartStore.dispatchToken]);
      TickerStore.emitChange();
      //setTimeout(ChartStore.emitChange(),1000);
      //ChartStore.emitChange();
      break;

    default:
      // do nothing
  }

});

module.exports = TickerStore;
