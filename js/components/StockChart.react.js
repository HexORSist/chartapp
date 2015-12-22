var React = require('react');
//var Highcharts = require("highcharts");
var ReactHighcharts = require('react-highcharts/dist/bundle/highcharts');
//var ReactDOM = require('react-dom');
var ChartStore = require('../stores/ChartStore');
var ChartActionCreators = require('../actions/ChartActionCreators');

/*var config = {
          xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          },
          series: [{
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
          }]        
    };*/
    
//var chartURLS = [];
//var charts = {};
//var config = {};
var thechart = {};

function getStateFromStores() {
  //console.log(this.prop.config)
  //console.log(this.prop.config)
  //console.log(ReactHighcharts)
  
  return {
    //tickers: TickerStore.getAllForCurrentThread()
    chartURLS: ChartStore.receiveChartURLS(),
    config: ChartStore.giveChartData()
    //thread: ThreadStore.getCurrent()
  };
}

var StockChart = React.createClass({
    
    getInitialState: function() {
        return getStateFromStores();
    },
    
    componentDidMount: function() {
        ChartStore.addChangeListener(this._receiveChartURLS);
        //thechart=this.refs.chart.getChart();
    },
    
    render: function() {
        var config = this.state.config;
        //console.log(config)
        return (<ReactHighcharts config = {config} ref="chart" className="chart"></ReactHighcharts>);
    },
    
     /*_getChartURLS: function() {
    //this.setState(getStateFromStores());
        
        ChartActionCreators.getChartURLS();
        console.log(chartURLS);
        
    },*/
    
    _receiveChartURLS: function() {
        this.setState(getStateFromStores());
        //thechart.config=config;
        //console.log(getStateFromStores());
    }
    
    
        

});

//var StockChart = ReactDOM.render(React.createElement(ReactHighcharts, { config: config }), document.getElementById('react'));
//var StockChart = React.render(<ReactHighcharts config = {config}></ReactHighcharts>, document.body);

module.exports = StockChart;
