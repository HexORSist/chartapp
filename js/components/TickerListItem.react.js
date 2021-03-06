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


var TickerMessageActionCreators = require('../actions/TickerMessageActionCreators');
var React = require('react');

var ReactPropTypes = React.PropTypes;

var TickerListItem = React.createClass({

  propTypes: {
    ticker: ReactPropTypes.string
  },

  render: function() {
    var ticker = this.props.ticker;
    return (
      <li className="ticker-list-item">
        <div className="ticker-text">{ticker}
        <span className="delete-ticker" onClick={this._onDelete}>&#10008;</span></div>
      </li>
    );
  },
  
  _onDelete: function() {
    TickerMessageActionCreators.deleteTicker(this.props.ticker);
  }

});

module.exports = TickerListItem;
