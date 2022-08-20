let http = require('http');
let url = require('url');

let Codes = {}

http.createServer(function (req, res) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'text/plain'
    }
    const {pathname, query} = url.parse(req.url, true)
    switch (pathname) {
        case '/send': {
            console.log(query)
            let {mobile} = query
            let code = Math.floor(Math.random() * 9000) + 1000
            Codes[mobile] = code
            console.log(mobile, code)
            res.writeHead(200, headers);
            res.end('DONE');
            return
        }
        case '/check': {
            let {mobile, code} = query
            let answer = Codes[mobile]
            console.log(mobile, code, answer)
            res.writeHead(200, headers);
            res.end((code == answer).toString());
            return
        }
        res.writeHead(500, headers);
    }
}).listen(8080);