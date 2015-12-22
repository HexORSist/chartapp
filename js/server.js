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

// This file bootstraps the entire application.


var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var routes = require('./routes/routes.js');
var bodyParser = require("body-parser");
//var mongoose = require('mongoose');


app.use('/css', express.static(process.cwd() + '/css'));
app.use('/js', express.static(process.cwd() + '/js'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended : true}));


routes(app);

var port = 8080;
app.listen(port, function () {
    console.log('Node.js listening on port ' + port + '...');
});
