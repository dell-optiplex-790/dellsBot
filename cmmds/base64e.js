$export = {
    exampleArgs: '"your string"',
    description: 'encode with base64',
    handler: function(args) {
        if(!args[1]) {
            return send('Syntax: ' + settings.prefix + 'base64e "your string"', true);
        }
        try {
            send('Encoded: ' + btoa(args[1]));
        } catch {
            send('Could not encode the string!', true);
        }
    }
}