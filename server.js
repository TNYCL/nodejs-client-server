const log = require('./log');
const settings = require('./settings');
const utilSQL = require('./mysql/util');
const util = require('./util');
const net = require('net');

var port = 1337;

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        link = util.bufferedToString(data);
        socket.write(main());
    });
    socket.on('error', () => {
        return;
    });
});

server.listen(port, '127.0.0.1');
log.success('Link shorter başlatıldı, dinlenen port: ' + port);

var link;

function main() {
    var key;
    if(!util.checkLink(link)) {
        return '{"error":1}';
    }
    utilSQL.getData(link, (error, data) => {
        if(error) throw error;
        key = data;
    });
    if(key != null) {
        return '{"error":2,"data":"'+ settings.websiteLink + key +'"}';
    }
    return short();
}

function short() {
    let uuid = util.createUUID();
    var shortedLink = settings.websiteLink + uuid;
    utilSQL.setData(uuid, link);
    return '{"error":0,"data":"' + shortedLink + '"}';
}