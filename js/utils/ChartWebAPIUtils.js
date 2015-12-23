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

var ChartActionCreators = require('../actions/ChartActionCreators');
var TickerMessageActionCreators = require('../actions/TickerMessageActionCreators');
//var React = require('react-dom');
var $ = require('jquery');


// !!! Please Note !!!
// We are using localStorage as an example, but in a real-world scenario, this
// would involve XMLHttpRequest, or perhaps a newer client-server protocol.
// The function signatures below might be similar to what you would build, but
// the contents of the functions are just trying to simulate client-server
// communication and server-side processing.

module.exports = {
  
  getAllTickers: function(){
    //console.log('getalltickers called');
    $.ajax({
      url: 'getAllTickers/',
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        //console.log(data)
        TickerMessageActionCreators.receivedTickers(data);
        //callback(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  
  deleteTicker: function(Ticker){
    $.ajax({
      url: 'deleteTicker/',
      dataType: 'json',
      type: 'POST',
      data: {Ticker:Ticker},
      success: function(data) {
        //ChartActionCreators.receivedChartData(data);
      }.bind(this),
      error: function(xhr, status, err) {
        //console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  
  addTicker: function(Ticker){
    //console.log(Ticker);
    $.ajax({
      url: 'addTicker/',
      dataType: 'json',
      type: 'POST',
      data: {Ticker:Ticker},
      success: function(data) {
        //ChartActionCreators.receivedChartData(data);
      }.bind(this),
      error: function(xhr, status, err) {
        //console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getChartData: function(chartURLS) {
    $.ajax({
      url: chartURLS,
      dataType: 'json',
      type: 'GET',
      success: function(data) {
        ChartActionCreators.receivedChartData(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  
  getChartURLS: function(ChartURLS) {
    $.ajax({
      url: 'getChartURLS/',
      dataType: 'json',
      type: 'POST',
      data: {ChartURLS:ChartURLS},
      success: function(data) {
        //console.log(data);
        ChartActionCreators.receivedChartURLS(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    
  }

};
