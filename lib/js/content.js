(function(chrome, document, window){
"strict mode";

    var link = document.getElementsByTagName('link');

    window.contentscript = {
        href:'',
        checkRSS:function(){
            for (var i = 0, l = link.length; i < l ; i++){
                if ( link[i].getAttribute('href').match('thumbnail.rss') ){
                    window.contentscript.href = link[i].href;
                    chrome.extension.sendRequest({
                            'action':'showIcon',
                            'href': window.contentscript.href
                        }, function(response) {});
                    break;
                }
            }
            return true;
        }
    }


})(chrome, document, window);

if (document.readyState === "complete") {
    window.contentscript.checkRSS();
} else {
    window.addEventListener('load', function(){
        window.contentscript.checkRSS();
    }, false);
};
chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.action === 'getRSSHref'){
        sendResponse({href:window.contentscript.href})
    } else {
        sendResponse({});
    }

});