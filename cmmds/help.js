$export = {
    description: 'this command',
    handler: function() {
        send(settings.nick + ' - Commands:\n' + Object.keys(cmmds).map(key => {
            var cmd = cmmds[key];
            return ' * ' + settings.prefix + (cmd.properName || key) + (cmd.exampleArgs ? ' ' + cmd.exampleArgs : '') + ' - ' + cmd.description;
        }).join('\n'));
    }
};