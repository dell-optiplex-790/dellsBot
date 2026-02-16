import io from 'socket.io-client';
import he from 'he';
import sha256 from 'sha256';
import { socketData, commandObject, config } from './types';
var socket = io('https://rmtrollbox.xd4y.zip');
var settings = {nick: '', color: '', prefix: ''};
var cmmds: Record<string, commandObject> = {};
if(!localStorage.getItem('.instanceID')) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.ipify.org', false);
    xhr.send();
    var ip = xhr.responseText;
    localStorage.setItem('.instanceID', sha256(navigator.userAgent + location.href + ip + String.fromCharCode(Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256))))
}
function cmdHandler_handleCommand(parsed: [string, ...Array<string>], data: socketData) {
    if(cmmds[parsed[0].toLowerCase()]) {
        cmmds[parsed[0].toLowerCase()].handler(parsed, data);
    } else {
        send('Unknown command: ' + (parsed[0].length > 16 ? (parsed[0].slice(0, 13) + '...') : parsed[0]), true);
        console.error('Unknown command:', parsed);
    }
}
function cmdHandler_parseCommand(cmd: string): [string, ...Array<string>] {
    console.info('Parse command:', cmd);
    var parsed = [], isQuot = false, tmp = '';
    for(var i = 0; i < cmd.length; i++) {
        if(cmd[i] == '"') {
            isQuot = !isQuot;
        } else if(cmd[i] == ' ' && !isQuot) {
            parsed.push(tmp);
            tmp = '';
        } else if(cmd[i] == '\\') {
            tmp += cmd[i + 1] || '';
            i++
        } else {
            tmp += cmd[i];
        }
    }
    parsed.push(tmp);
    return [parsed[0] || '', ...parsed.slice(1)];
}
function send(msg: string, error?: boolean) {
    var formatted = msg;
    if(error) {
        formatted = '<span style="color: tomato; font-size: 12px; vertical-align: baseline">\u24E7</span> ' + msg;
    }
    socket.send('<span style="font-family: Comic Sans MS; font-size: 10px">' + formatted + '</span>');
}
function reloadCfg() {
    Object.defineProperty(window, 'settings', {
        value: settings,
        configurable: true
    });
    socket.emit('user joined', settings.nick + ' [' + settings.prefix + ']', '#66477d', '', '');
}
function setConfig(c: config) {
    settings = c;
    reloadCfg();
}
function setCmmds(c: Record<string, commandObject>) {
    cmmds = c;
    Object.defineProperty(window, 'cmmds', {
        value: cmmds,
        configurable: true
    });
}
socket.on('message', (data) => {
  if(data.msg.startsWith(settings.prefix)) {
    const cmdData = cmdHandler_parseCommand(he.decode(data.msg).slice(settings.prefix.length));
    cmdHandler_handleCommand(cmdData, data);
  }
});


// exporting stuff idk
Object.defineProperty(window, 'setCmmds', {
    value: setCmmds
});

Object.defineProperty(window, 'setConfig', {
    value: setConfig
});

Object.defineProperty(window, 'settings', {
    value: settings,
    configurable: true
});

Object.defineProperty(window, 'cmmds', {
    value: cmmds,
    configurable: true
});

Object.defineProperty(window, 'send', {
    value: send
});