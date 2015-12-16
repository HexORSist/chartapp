
module.exports = {
    createChartURLS: function(charts) {
        var baseURL = "https://www.quandl.com/api/v3/datasets/WIKI/";
        var currdate = new Date()
        //moment().subtract(365, 'days').calendar();
        //var yearago=moment().subtract(1, 'year').calendar();
        //moment().format('YYYY-MM-DD');
        var yearago = (currdate.getFullYear()-1)+'-'+(currdate.getMonth()+1)+'-'+currdate.getDate();
        
        var URLS = charts.map(function(elm){
            return baseURL+elm+'.json?'+'&start_date='+yearago+'&column_index=4&collapse=weekly';
        });
        
        //console.log(URLS);
        return JSON.stringify(URLS[0])
    }
};