const clipboard = require('clipboardy');

function checkLink(link) {
    let str = link + '';
    return str.startsWith('https://');
}

function bufferedToString(data) {
    return data.toString('utf8');
}

function createUUID() {
    let char = () => Math.floor((Math.random())*0x1000).toString(16).substring(1); 
    let guid = `${char()}-${char()}${char()}${char()}-${char()}${char()}${char()}`;
    return guid.toUpperCase();
}

function copyString(string) {
    clipboard.writeSync(string);
}

module.exports = {checkLink,bufferedToString,createUUID,copyString};