const SETTINGS = {
        THEMES :{
            BLACK:'',
            WHITE:'backgroundcolor=%23FFFFFF&style=light&glowcolor=%23000000',
            SLATE:'backgroundcolor=%23191d25&glowcolor=%23BABABA',
            RADIANCE:'backgroundcolor=%23000000&backgroundimage=https%3A%2F%2Fwww.cooliris.com%2Fyoursite%2Fexpress%2Fbuilder%2Fimages%2Fthemes%2Fstars.jpg&style=dark&glowcolor=%23FFFFFF',
            SPECTRUM:'backgroundcolor=%23000000&backgroundimage=https%3A%2F%2Fwww.cooliris.com%2Fyoursite%2Fexpress%2Fbuilder%2Fimages%2Fthemes%2Fspectrum.jpg&style=dark&glowcolor=%23FFFFFF',
            FINALFRONTIER:'backgroundcolor=%23000000&backgroundimage=https%3A%2F%2Fwww.cooliris.com%2Fyoursite%2Fexpress%2Fbuilder%2Fimages%2Fthemes%2Fearth.jpg&style=dark&glowcolor=%23FFFFFF'
        },
        ROWS:5,
        THEME:'SPECTRUM',
        TESTVALUE:'ABC'
    };


(function(chrome, document, window){
    "use strict";

    var coolrss ,
        tabIds = [];

    coolrss = {
        href:'',
        onRequest:function(request, sender, sendResponse) {
            if (!!request.href && request.action === 'showIcon'){
                tabIds.push(sender.tab.id);
                coolrss.href = request.href;
                chrome.pageAction.show(sender.tab.id);
            }
            sendResponse({});
        },
        onPageAction : function(tab){
            if (!!coolrss.href){
                return chrome.tabs.create({
                    'index': tab.index+1,
                    'url': chrome.extension.getURL('cooliris.html')
                });
            }
            return false;
        },
        onTabFocus : function(tabId,  selectInfo){
            chrome.tabs.sendRequest(tabId,{action:'getRSSHref'},function(response){
                coolrss.href = response.href;
            });
            /*
            for (var i = 0, l = tabIds.length; i < l; i++){
                if (tabId === tabIds[i]){
                    chrome.tabs.sendRequest(tabId,{action:'updateHref'},function(response){
                        coolrss.href = response.href;
                    });
                    break;
                }
            }
            */
        },
        getSetting : function(key){
            var value = localStorage.getItem(key);
            if (!value && !!SETTINGS[key]){
                value = SETTINGS[key];
            }
            if (key === 'THEME' && !!SETTINGS.THEMES[value]){
                value = SETTINGS.THEMES[value];
            }
            return value;
        }
    }
    window.coolrss = coolrss;

    chrome.extension.onRequest.addListener(coolrss.onRequest);
    chrome.pageAction.onClicked.addListener(coolrss.onPageAction);
    chrome.tabs.onSelectionChanged.addListener(coolrss.onTabFocus);

})(chrome, document, window);
