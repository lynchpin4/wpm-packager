(function(WPM){
    
    WPM.SDK = WPM.SDK || {};
    
    WPM.SDK.Frame = function(el)
    {
        this.isReady = false;
        
        if (WPM.isFrame)
        {
            throw "circular frame detected and blocked.";
            return;
        }
        
        var frame = document.createElement("iframe");
        frame.src = WPM.Constants.SANDBOX_URL;
        
        if (el)
        {
            document.querySelector(el).appendChild(frame);
        }
        else
        {
            document.body.appendChild(frame);
        }
        
        this.frame = frame;
        this.content = frame.contentWindow;
    };
    
    console.log('app sdk loaded. ready for non-page contexts');
    
})(WPM);