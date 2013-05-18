window.addEventListener('load',function(){
    var backgroundPage = chrome.extension.getBackgroundPage(),
        href = encodeURIComponent( backgroundPage.coolrss.href ),
        rows = backgroundPage.coolrss.getSetting('ROWS'),
        theme = backgroundPage.coolrss.getSetting('THEME'),
        flashvars = 'feed='+ href +'&'+ theme +'&numrows='+ rows +'&showchrome=true',
        html = '<object id="ci_19256_o" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="https://apps.cooliris.com/embed/cooliris.swf?t=1307582197"/><param name="allowFullScreen" value="true"/><param name="allowScriptAccess" value="always"/><param name="bgColor" value="#121212" /><param name="flashvars" value="'+ flashvars +'" /><param name="wmode" value="opaque" /><embed id="ci_19256_e" type="application/x-shockwave-flash" src="https://apps.cooliris.com/embed/cooliris.swf?t=1307582197"  width="100%" height="100%" allowFullScreen="true" allowScriptAccess="always" bgColor="#121212" flashvars="'+ flashvars +'" wmode="opaque"></embed></object>';
    document.getElementsByTagName('body')[0].innerHTML = html;
},false);