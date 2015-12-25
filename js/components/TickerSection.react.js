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

var TickerComposer = require('./TickerComposer.react');
var TickerListItem = require('./TickerListItem.react');
var TickerStore = require('../stores/TickerStore');
var ChartWebAPIUtils = require('../utils/ChartWebAPIUtils');

var React = require('react');

function getStateFromStores() {
  return {
    tickers: TickerStore.getAllTickers()
  };
}

function getTickerListItem(_ticker) {
  return (
    <TickerListItem
      key={_ticker}
      ticker={_ticker}
    />
  );
}

var TickerSection = React.createClass({

  getInitialState: function() {
    return getStateFromStores();
  },

  componentDidMount: function() {
    TickerStore.addChangeListener(this._onChange);
    ChartWebAPIUtils.getAllTickers();
  },

  componentWillUnmount: function() {
    TickerStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var tickerListItems = this.state.tickers.map(getTickerListItem);
    return (
      <div className="ticker-section">
        <h3 className="ticker-heading">Stocks</h3>
        <ul className="ticker-list" ref="messageList">
          {tickerListItems}
        </ul>
        <TickerComposer/>
      </div>
    );
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  }

});

module.exports = TickerSection;
