/*
 * Packager
 * http://packager.webpushers.com/
 *
 * Copyright (c) 2014 - gray @ webpushers.com
 * Licensed under the BSD-Clause-2
 */

var path = require('path'),
    fs = require('fs');

var Packager = require('./packagebuilder');
Packager.greet();

module.exports = function(grunt) {
	
	Packager.setGrunt(grunt);
	
	grunt.registerMultiTask('packager', 'Package css, image and javascript files into a single output json.', function()
	{
		var options = this.options({
			name: 'set-name-in-options',
            context: 'page',
			output: 'packaged.json',
            root: path.resolve(),
            packagerDebug: false,
            autoload: true,
			b64out: false
		});
        
        if (!fs.existsSync(options.root))
        {
            grunt.log.writeln('Package contents folder '+options.root+' does not exist. Default is Gruntfile directory.');
        }
        
        grunt.log.writeln('Package Root Directory: '+ options.root);
		
		var builder = new Packager.PackageBuilder();
		builder.package.setName(options.name);
        builder.package.setContext(options.context);
		
		var cssFiles = null;
		var jsFiles = null;
		var files = null;
		
		this.files.forEach(function(d){
			var o = d.orig;
			if (o.dest === "js") { jsFiles = o.src; }
			if (o.dest === "css") { cssFiles = o.src; }
			if (o.dest === "files") { files = o.src; }
		});
		
		if (cssFiles != null)
		{
			cssFiles.forEach(function(cssf){
                if (cssf == null) return;
                cssf = path.join(options.root, cssf);
                
				if (options.packagerDebug) grunt.log.writeln('adding css file: '+cssf);
				var file = grunt.file.read(cssf);
				var name = path.basename(cssf).split('.')[0];
				
				builder.addCss(name, file);
			});
		}
		
		if (jsFiles != null)
		{
			jsFiles.forEach(function(jsf){
                if (jsf == null) return;
                jsf = path.join(options.root, jsf);
                
				if (options.packagerDebug) grunt.log.writeln('adding js file: '+jsf);
				var file = grunt.file.read(jsf);
                var name = path.basename(jsf).split('.')[0];
				builder.addJs(name, file);
			});
		}
		
		if (files != null)
		{
			files.forEach(function(f){
                if (f == null) return;
                f = path.join(options.root, f);
                
				if (options.packagerDebug) grunt.log.writeln('adding arbitrary file: '+f);
				var file = grunt.file.read(f);
				var name = path.basename(f).split('.')[0];
				
				builder.addFile(name, file);
			});
		}
		
		var result = builder.toString();
        
        // jsonp style callback that feeds the app into the package loader
        if (options.autoload)
        {
            result = "WPM.loadApp(" + result + ");";
        }
		
		if (options.b64out)
		{
			result = new Buffer(result).toString("base64");
		}
		
		grunt.log.writeln('Writing '+options.output+'..');
		grunt.file.write(options.output, result, { encoding: 'UTF-8' });
		grunt.log.writeln('Packaged file '+options.output+' written.');
	});
	
};