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
var React = require('react');
//var ThreadStore = require('../stores/ThreadStore');

function getStateFromStores() {
  return {
    //tickers: TickerStore.getAllForCurrentThread()
    tickers: TickerStore.getAllForThread()
    //thread: ThreadStore.getCurrent()
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
    this._scrollToBottom();
    TickerStore.addChangeListener(this._onChange);
    //ThreadStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TickerStore.removeChangeListener(this._onChange);
    //ThreadStore.removeChangeListener(this._onChange);
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

  componentDidUpdate: function() {
    this._scrollToBottom();
  },

  _scrollToBottom: function() {
    var ul = this.refs.messageList.getDOMNode();
    ul.scrollTop = ul.scrollHeight;
  },

  /**
   * Event handler for 'change' events coming from the MessageStore
   */
  _onChange: function() {
    this.setState(getStateFromStores());
    //console.log(this.tickers);
  }

});

module.exports = TickerSection;
