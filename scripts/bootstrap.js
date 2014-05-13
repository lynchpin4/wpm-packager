
/*
 * Asynchronous WPM Loader / Bootstrap
 * http://packager.webpushers.com/
 *
 * Copyright (c) 2014 - gray @ gangster dot io
 * Licensed under the BSD-Clause-2
 */
 
 /** @define {boolean} */
 var WPM_DEBUG_ENABLED = true;

/*
 * Constants (Override by creating window.WPM_CONSTANT_OVERRIDES)
 */
(function(){
	/** @expose */
	window.WPM = WPM || {};
	
	WPM.Constants = {
		JQUERY_URL: "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js",
        UNDERSCORE_URL: "//cdnjs.cloudflare.com/ajax/libs/lodash.js/2.4.1/lodash.min.js", /* replaced underscore w/ lodash */
        BOOTSTRAP_URL: document.querySelector('#wpm_bootloader').src /* url to the bootstrap of WPM */
	};
	
	if (window.WPM_CONSTANT_OVERRIDES)
		for (var a in window.WPM_CONSTANT_OVERRIDES) { WPM.Constants[a] = WPM_CONSTANT_OVERRIDES[a]; }
})();

(function(){
	var Log = {
		warn: function(o) { console.warn(o); },
		log: function(o) { console.log(o); },
		i: function(o) { console.info(o); }
	}
	
	var WPMBS = function() {
        var context = new WPM.Context(window);
		var loadjq = false;
        
		if (!window.jQuery)
		{
			Log.i('-- jquery not present on page, loading --');
			loadjq = true;
		}
		
		if (loadjq)
		{
			var self = this;
			(function(){
				var tId = setInterval(function(){
                    if(window["jQuery"] && window["_"]) 
                        onComplete();
                },11);
                
                // should probs be rewritten as dependencies -- browser will handle caching.
                var jqUrl = WPM.Constants.JQUERY_URL;
                if (window.location.protocol.indexOf('file') != -1)
                {
                    jqUrl = "http" + jqUrl;
                }
                
                context.injectScript(jqUrl);
                
                var underscoreUrl = WPM.Constants.UNDERSCORE_URL;
                if (window.location.protocol.indexOf('file') != -1)
                {
                    underscoreUrl = "http" + underscoreUrl;
                }
                
                context.injectScript(underscoreUrl);
                
                function onComplete(){
					clearInterval(tId);
					jQuery.noConflict();
					WPM.bootstrapObject.$ = jQuery;
                    WPM.$ = jQuery;
                    WPM._ = _.noConflict();
					WPM.bootstrapObject.onJQLoaded();
				};
			})();
		}
		else
		{
			this.$ = jQuery;
			this.onJQLoaded();
		}
	}
	
	WPMBS.prototype.onJQLoaded = function()
	{
		Log.i('-- wpm bootstrap (jquery, underscore loaded) --');
        WPM.loadMicroappSupport();
	}
	
	WPMBS.prototype.onFinished = function()
	{
		Log.i("-- wpm initialized --");
        if (window["wpm_load_callback"])
        {
            window["wpm_load_callback"]();
        }
	}
	
	window.WPM.boot = function()
	{
		WPM.bootstrapObject = new WPMBS();
	}
	
	/** @expose **/
	window.WPMBS = WPMBS;
})();

/** @expose */
WPM.loadComplete = function onComplete(){
	clearInterval(WPM.tId);    
	WPM.boot();
};

// bootstrap asap
(function(){
    WPM.tId = setInterval(function(){if(WPM.Context && document.readyState == "complete") WPM.loadComplete()},11);
})();