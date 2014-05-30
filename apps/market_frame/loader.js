// Use the SDK to dynamically inject the store as a frame
(function(){
    
    // use the jq and underscore WPM has loaded
    
    var html = WPM.getApp('market_frame').getFile('divs');
    var div = document.createElement('div');
    div.innerHTML = html;
    document.body.appendChild(div.firstChild);
    
    var frame = new WPM.SDK.Frame('#wpm_appstore_container');
    
    frame.onReady = function() {
        console.log('loading the market in the frame..');
        frame.send({
            cmd: "eval",
            code: "WPM.loadAppFromScript('//market.webpushers.com/packages/wpm.js');"
        });
    }
})();