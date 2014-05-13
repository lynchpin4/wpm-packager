/*
 * Package Loader (Misleading as Microapps handles loading of packages)
 * http://packager.webpushers.com/
 *
 * Copyright (c) 2014 - gray @ gangster dot io
 * Licensed under the BSD-Clause-2
 */

/** @expose */
window.WPM = window.WPM || {};

/** @expose */
window.WPM_CONSTANT_OVERRIDES = window.WPM_CONSTANT_OVERRIDES || {};

/** @expose */
window.WPM.debug = true;
/** @expose */
window.WPM.Log = {
	warn: function(o) { if (WPM.debug) console.warn(o); },
	log: function(o) { if (WPM.debug) console.log(o); },
	i: function(o) { if (WPM.debug) console.info(o); }
};

window.WPM.isFrame = (parent != window);

/* closure */
(function(window){
	
	var parent = window;
	var Log = parent.WPM.Log;
	
	/**
	 * Given a window root object, provides a context into which packages can be loaded and injects core
	 * WPM functionality into the scope.
	 * @constructor
	 * @expose
	 */
	parent.WPM.Context = function(window)
	{
		this.window = window;
		if (this.window.location.host != parent.location.host)
		{
			Log.warn("Warning -- Frame host mismatch. Scripts and frames may not communicate properly within the WPM context.");
		}
	};
	
	parent.WPM.Context.prototype.injectScript = function(src, id)
	{
		var script = document.createElement('script');
		script.src = src;
		script.type = 'text/javascript';
        
        if (id)
        {
            script.id = id;
        }
		
		if (this.window.document.head) {
			this.window.document.head.appendChild(script);
		}
		else
		{
			this.window.document.body.appendChild(script);
		}
	};
    
    window["WPM_ROOT_CONTEXT"] = new WPM.Context(parent);
    
})(window);