jQuery.fn.imageFromB64 = function(encodedImageSource) {
    //set the data type for the source and append the encoded image
    $(this).attr('src', 'data:image/gif;base64,' + encodedImageSource);
};

var AxcidScript = AxcidScript || {};

// The core script loader. Loads packed micro web applications and injects them into the page DOM.
(function(ns){

    ns.showAlert = function(message) {

    };

    ns.installButtonClicked = function(scriptID, el) {
        $(el).button('loading');
    };

    // Register the class
    ns.ScriptLoader = (function() {
        var API_ROOT = "";
        // The actual loader class
        var Loader = function(ns) {
            // Constructor Code
        };

        // Load a package from a remote URL (This is where as a production app, we will need to serve resources over HTTPS and make sure scripts are authorized to run.
        // Serve the result over JSONP
        Loader.prototype.loadRemotePackage = function(url) {

        };

        Loader.prototype.loadLocalPackages = function() {

        };

        Loader.prototype.processPackage = function(package) {

        };

        Loader.prototype.injectJS = function(js) {

        };

        Loader.prototype.loadSiteApplications = function() {
            $.getJSON(API_ROOT + 'api/motherfuckinglist', function(data) {

            });
        };

        Loader.prototype.loadTopApplications = function() {

        };

        Loader.prototype.renderApplicationsList = function() {

        };

        Loader.prototype.saveManifestWithKey = function(manifest, key) {
            //save our json with auth token + script id?
            if(this.hasLocalStorageAccess())
            {
                $.jStorage.set(key, manifest);
            }
            else
            {
                console.log('Unable to save manifest!');
            }
        };

        Loader.prototype.hasLocalStorageAccess = function() {
            return $.jStorage.storageAvailable();
        };

        // Initialize it so this function returns an instance of itself.
        return new Loader(ns);
    })();

})(AxcidScript);

$(function () {
    
    $("body").append(WPM.getApp('wpm').getFile('market-fragment'));
    
    var apps = [
        {
            title : 'test app',
            icon : 'http://files.softicons.com/download/application-icons/48px-icons-1-4-by-leonard-schwarz/png/48x48/Map.png',
            installed : true
        },
        {
            title : 'testing application',
            icon : 'http://cdn5.iconfinder.com/data/icons/48px_icons_collection_by_neweravin/48/adress_book.png',
            installed : false
        },
        {
            title : 'test app',
            icon : 'http://files.softicons.com/download/application-icons/48px-icons-1-4-by-leonard-schwarz/png/48x48/Map.png',
            installed : true
        },
        {
            title : 'testing application',
            icon : 'http://cdn5.iconfinder.com/data/icons/48px_icons_collection_by_neweravin/48/flash.png',
            installed : true
        }
    ];

    //yeah...
    $(document).ready(function() {
        //activate our market
        $('#marketModal').modal('show');

        //make the scroll sexy for our app results
        $('.app-results').slimScroll({
            height: '190px',
            alwaysVisible: false
        });

        //test out our template
        $('#appResultTemplate').tmpl(apps).appendTo('#appResultsBody');
    });
})