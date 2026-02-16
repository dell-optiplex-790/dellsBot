$export = {
    description: 'say hi',
    handler: function(args, data) {
        var div = document.createElement('div');
        div.innerHTML = data.nick;
        // disinfection routine
        (function disinfect(el) {
            if(el.nodeType != Node.ELEMENT_NODE) {
                return;
            }
            if(el.tagName == 'MARQUEE' || el.tagName == 'TABLE' || el.tagName == 'TBODY' || el.tagName == 'TR' || el.tagName == 'TD') {
                var parent = el.parentElement;
                el.outerHTML = el.innerHTML;
                return disinfect(parent);
            }
            if(['BUTTON', 'A'].includes(el.tagName)) {
                return el.remove();
            }
            var children = el.children;
            for(var i = 0; i < el.attributes.length; i++) {
                if(el.attributes[i].name.startsWith('on')) {
                    // remove events
                    el.attributes.removeNamedItem(el.attributes[i].name);
                }
            }
            for(var i = 0; i < children.length; i++) {
                disinfect(children[i]);
            }
        })(div);
        // end of disinfection routine
        send('Hi, <span style="color:' + data.color.split('"')[0].split(';')[0] + '">' + div.innerHTML + '</span>!');
    }
}