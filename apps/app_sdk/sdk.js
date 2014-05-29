(function(WPM){
    
    WPM.SDK = WPM.SDK || {};
    WPM.SDK.frames = WPM.SDK.frames || [];
    
    WPM.SDK.frameIdentifier = "wpm_sdk_";
    
    WPM.SDK.Frame = function(el)
    {
        WPM.SDK.frames.push(this);
        this.isReady = false;
        this.onReady = function() { }; // need events support
        
        if (WPM.isFrame)
        {
            throw "circular frame detected and blocked.";
            return;
        }
        
        var frame = document.createElement("iframe");
        frame.src = WPM.Constants.SANDBOX_URL;
        frame.id = WPM.SDK.frameIdentifier + WPM.SDK.frames.length;
        frame.frameBorder = ''
        //frame.src = window.location.protocol + '//' + (window.location.href).split('/')[2] + '/sandbox';
        
        if (el)
        {
            document.querySelector(el).appendChild(frame);
        }
        else
        {
            document.body.appendChild(frame);
        }
        
        this.request = 0;
        
        this.frame = frame;
        this.content = frame.contentWindow;
        
        // reset content
        var fr = this;
        //this.resetWindow();
        //setTimeout(fr.resetWindow, 2000);
        
        // attach listener
        if (window.attachEvent)
        {
            window.attachEvent('onmessage', fr.onFrameMessage.bind(this));
        } else if (window.addEventListener) {
            window.addEventListener('message', fr.onFrameMessage.bind(this), false);
        }
    };
    
    WPM.SDK.Frame.prototype.onFrameMessage = function(e)
    {
        var obj = JSON.parse(e.data);
     //   console.log('frame message');
      //  console.dir(obj);
        if (obj && obj.type == "fr")
        {
            switch (obj.cmd)
            {
                case 'eval':
                    this.send({
                        request: obj,
                        response: eval(obj.code)
                    });
                    break;
                case 'wpm_ready':
                    this.isReady = true;
                    if (this.onReady) this.onReady();
                    break;
            }
        }
    };
    
    WPM.SDK.Frame.prototype.send = function(data) {
        data.type = 'fr';
        data.id = this.request++;
        this.content.postMessage(JSON.stringify(data), '*');
    };
    
    console.log('app sdk loaded. ready for non-page contexts');
    
})(WPM);