var React = require('react');
var ReactHighcharts = require('react-highcharts/dist/bundle/highcharts');
var ChartStore = require('../stores/ChartStore');
var ChartActionCreators = require('../actions/ChartActionCreators');

var thechart = {};

function getStateFromStores() {

  return {
    chartURLS: ChartStore.receiveChartURLS(),
    config: ChartStore.giveChartData()
  };
}

var StockChart = React.createClass({
    
    getInitialState: function() {
        return getStateFromStores();
    },
    
    componentDidMount: function() {
        ChartStore.addChangeListener(this._receiveChartURLS);
    },
    
    render: function() {
        var config = this.state.config;
        return (<ReactHighcharts config = {config} ref="chart" className="chart"></ReactHighcharts>);
    },

    _receiveChartURLS: function() {
        this.setState(getStateFromStores());
    }
});

module.exports = StockChart;
