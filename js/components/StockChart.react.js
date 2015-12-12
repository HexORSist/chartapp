var React = require('react');
//var Highcharts = require("highcharts");
var ReactHighcharts = require('react-highcharts/dist/bundle/highcharts');
//var ReactDOM = require('react-dom');

var config = {
          xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          },
          series: [{
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
          }]        
    };

var StockChart = React.createClass({
    
    render: function() {
        return (<ReactHighcharts config = {config} className="chart"></ReactHighcharts>);
    }
        

});

//var StockChart = ReactDOM.render(React.createElement(ReactHighcharts, { config: config }), document.getElementById('react'));
//var StockChart = React.render(<ReactHighcharts config = {config}></ReactHighcharts>, document.body);

module.exports = StockChart;
