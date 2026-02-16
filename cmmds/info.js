$export = {
    description: 'bot info',
    handler: function() {
        send(
            'this bot started off as a proof-of-concept for a bot that runs in the browser.\n' +
            'version: ' + settings.version + '\n' + 
            'instance id: ' + localStorage.getItem('.instanceID')
        );
    }
}