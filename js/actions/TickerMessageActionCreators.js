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
var TickerWebAPIUtils = require('../utils/TickerWebAPIUtils');
//var ChatMessageUtils = require('../utils/ChatMessageUtils');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

  createMessage: function(text) {
    AppDispatcher.dispatch({
      type: ActionTypes.CREATE_MESSAGE,
      ticker: text
    });
    //var message = ChatMessageUtils.getCreatedMessageData(text, currentThreadID);
    TickerWebAPIUtils.createMessage(text);
  },
  
    deleteTicker: function(ticker) {
    AppDispatcher.dispatch({
      type: ActionTypes.DELETE_TICKER,
      ticker: ticker
    });
    //var message = ChatMessageUtils.getCreatedMessageData(text, currentThreadID);
    //TickerWebAPIUtils.createMessage(ticker);
  }

};
