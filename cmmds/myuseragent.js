$export = {
    properName: 'myUserAgent',
    description: 'get user agent',
    handler: function() {
        send('User-Agent: ' + navigator.userAgent);
    }
}