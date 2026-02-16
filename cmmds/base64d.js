$export = {
    exampleArgs: 'eW91ciBzdHJpbmc=',
    description: 'decode from base64',
    handler: function(args) {
        if(!args[1]) {
            return send('Syntax: ' + settings.prefix + 'base64d eW91ciBzdHJpbmc=', true);
        }
        try {
            send('Decoded: ' + atob(args[1]));
        } catch {
            send('Could not decode the string!', true);
        }
    }
}