const express = require('express');
const app     = express();
const path    = require('path');
const fs      = require('fs');

const port = process.env.PORT || 8080;

app.use('/public', express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/static'));

app.get('/', function(req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, './views')});
});
// /^=name of file (+)=matchanything .spaces $/
app.get(/^(.+)$/, function(req, res) {
    console.log(req.params);
    try {
        if( fs.statSync(path.join(__dirname, './views', req.params[0] + '.html')).isFile() ) {
            res.sendFile(req.params[0] + '.html', {root: path.join(__dirname, './views')});
        }
    } catch(err) {
        console.log(err);
        res.sendFile('404.html', {root: path.join(__dirname, './views')});
    }
})

app.listen(port, function() {
    console.log('app running on heroku: ' + port);
})
