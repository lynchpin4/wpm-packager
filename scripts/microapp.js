
/*
 * MicroApp Loader / Core
 * http://packager.webpushers.com/
 *
 * Copyright (c) 2014 - gray @ gangster dot io
 * Licensed under the BSD-Clause-2
 */

window.WPM = window.WPM || {};
WPM.readyForApps = false; // loaded and ready to inject apps

if (!WPM.microApps) WPM.microApps = [];
if (!WPM.loadAppQueue) WPM.loadAppQueue = [];

// Load app from loaded package JSON
WPM.loadApp = function(microapp)
{   
    if (!WPM.readyForApps) {
        WPM.loadAppQueue.push(microapp);
    } else {
        console.log(microapp.name + ' being injected..');
        
        var context = null;
        if (microapp.context == "page")
        {
            context = WPM_ROOT_CONTEXT;
        }
        
        var app = new WPM.MicroApp(context, microapp);
        WPM.microApps.push(app);
        
        app.launch();
        
        console.log(app.package.name + ' injected');
    }
};

// Return the running instance of a microapp
WPM.getApp = function(name)
{
    for (var i=0;i<WPM.microApps.length;i++)
    {
        if (WPM.microApps[i].name == name) return WPM.microApps[i];
    }
    
    return null;
};

// Not sure if there is a need for this yet, multiple microapp instances?
WPM.getApps = function(name)
{
    var returns = [];
    
    for (var i=0;i<WPM.microApps.length;i++)
    {
        if (WPM.microApps[i].name == name) returns.push(WPM.microApps[i]);
    }
    
    return returns;
};

// called when underscore and jq are loaded asynchronously
WPM.loadMicroappSupport = function(){
    var _ = WPM._ || window._;
    var $ = WPM.$ || window.jQuery;
    
    (function(WPM){
        
        // Most likely used for non cross domain packaged apps.
        WPM.loadAppFromURL = function(url)
        {
            $.getJSON(url, function(pkg){
                WPM.loadApp(pkg);
            });
        };

        WPM.loadInlineApp = function(id){
            WPM.loadApp($.parseJSON($('#'+id).html()));
        };
        
        WPM.loadAppFromScript = function(url)
        {
            var script = document.createElement('script');
            script.src = url;
            script.type = 'text/javascript';
            
            if (document.head) {
                document.head.appendChild(script);
            }
            else
            {
                document.body.appendChild(script);
            }
        };
        
        /*
         * The Microapp Instance - One per package loaded
         */
        WPM.MicroApp = function(context, package) {
            this.window = context.window;
            this.package = package;
            this.name = package.name;
            this.currentResource = 1;

            // reference the elements on the page so styles can be removed later
            this.scriptElements = [];
            this.cssElements = [];

            this.files = {};
        };

        // get an id for a script element or style tag
        WPM.MicroApp.prototype.getId = function(type)
        {
            this.currentResource++;
            return this.package.name + "_" + type + "_"+this.currentResource;
        };

        WPM.MicroApp.prototype.getFile = function(index)
        {
            return this.files[index];
        };

        // the standard launch of a package, inject the resources into the context
        WPM.MicroApp.prototype.launch = function()
        {
            var self = this;
            
            for (var i=0;i<this.package.files.length;i++)
            {
                var fo = this.package.files[i];
                self.files[fo.name] = atob(fo.src);
            }
            
            for (var i=0;i<this.package.js.length;i++)
            {
                var jso = this.package.js;
                var el = document.createElement('script');
                el.type = 'text/javascript';
                el.id = self.getId('script');
                el.innerHTML = atob(jso.src);
                document.body.appendChild(el);
                
                self.scriptElements.push(el);
            }

            for (var i=0;i<this.package.css.length;i++)
            {
                var cso = this.package.css[i];
                var el = document.createElement('style');
                el.type = 'text/css';
                el.id = self.getId('style');
                el.innerHTML = atob(cso.src);
                document.body.appendChild(el);
                
                self.cssElements.push(el);
            }
        };

        // handle cleanup - some apps may require a page refresh to remove completely.
        WPM.MicroApp.prototype.shutdown = function()
        {
        };

    })(window.WPM);
    
    console.log('-- microapp support initialized / injecting apps --');
    
    WPM.readyForApps = true;
    if (WPM.loadAppQueue.length != 0)
    {
        for (var i = 0; i < WPM.loadAppQueue.length;i++)
        {
            WPM.loadApp(WPM.loadAppQueue[i]);
        }
    }
    
    // review / fix
    if (WPM.bootstrapObject != null && WPM.bootstrapObject.onFinished) WPM.bootstrapObject.onFinished();
};