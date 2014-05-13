(function(WPM){
    
    WPM.SDK = WPM.SDK || {};
    
    WPM.SDK.Frame = function(el)
    {
        this.isReady = false;
        this.html = WPM.getApp('sdk').getFile('frame');
        
        if (WPM.isFrame)
        {
            throw "circular frame detected and blocked.";
            return;
        }
        
        var frame = document.createElement("iframe");
        frame.src = window.location.toString();
        
        if (el)
        {
            document.querySelector(el).appendChild(frame);
        }
        else
        {
            document.body.appendChild(frame);
        }
        
        frame.contentWindow.document.head.innerHTML = "";
        frame.contentWindow.document.body.innerHTML = "";
        
        var bootloader_url = document.querySelector('#wpm_bootloader').src;
        console.log(bootloader_url);
        
     //   frame.contentWindow.document.head.innerHTML = '<script type="text/javascript" src="'+bootloader_url+'"></script>';
        
        this.frame = frame;
        this.content = frame.contentWindow;
    };
    
    console.log('app sdk loaded. ready for non-page contexts');
    
})(WPM);