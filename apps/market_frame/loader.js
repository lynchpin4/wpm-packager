// Use the SDK to dynamically inject the store as a frame
(function(){
    
    // use the jq and underscore WPM has loaded
    var $ = WPM.$;
    var _ = WPM._;
    
    var html = WPM.getApp('market_frame').getFile('divs');
    console.log(html);
    $("body").append(html);
    
    console.log(html);
    
    var frame = new WPM.SDK.Frame('#wpm_appstore_container');
    
})();