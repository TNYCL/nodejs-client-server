const net = require('net');
const log = require('./log');
const util = require('./util');

var link = process.argv.slice(2)[0];

const client = new net.Socket();
client.connect(1337, '127.0.0.1', () => {
    if(link == null) {
        log.error('Veri girilmedi.');
        process.exit();
    }
    client.write(link);
});

client.on('data', (data) => {
    var json = JSON.parse(data.toString('utf-8'));
    if(json.error == 1) {
        error('Link hatalı, lütfen kontrol edin.');
    }
    if(json.error == 2) {
        error('Bu link zaten kısaltılmış: ' + json.data);
    }
    log.info('Link başarıyla kısaltıldı: ' + json.data);
    log.success('Link panoya kopyalandı.');
    util.copyString(json.data);
    process.exit();
});

client.on('error', () => {
    console.log('Sunucuyla olan bağlantı koptu.');
});

function error(msg) {
    log.error(msg);
    process.exit();
}