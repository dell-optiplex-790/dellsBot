$export = {
    exampleArgs: '"new name"',
    description: 'set bot name',
    handler: function(args) {
        if(!args[1]) {
            return send('Syntax: ' + settings.prefix + 'name "new name"', true);
        }
        setConfig({
            prefix: '&',
            nick: args[1],
            color: '#66477d'
        });
    }
}