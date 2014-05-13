/*
 * Packager
 * http://packager.webpushers.com/
 *
 * Copyright (c) 2014 - gray @ webpushers.com
 * Licensed under the BSD-Clause-2
 */

var path = require('path');

var Packager = require('../src/packager');
Packager.greet();

module.exports = function(grunt) {
	
	Packager.setGrunt(grunt);
	
	grunt.registerMultiTask('packager', 'Package css, image and javascript files into a single output json.', function()
	{
		var options = this.options({
			name: 'set-name-in-options',
            context: 'page',
			output: 'packaged.json'
		});
		
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
				console.log('adding css file: '+cssf);
				var file = grunt.file.read(cssf);
				var name = path.basename(cssf).split('.')[0];
				
				builder.addCss(name, file);
			});
		}
		
		if (jsFiles != null)
		{
			jsFiles.forEach(function(jsf){
                if (jsf == null) return;
				console.log('adding js file: '+jsf);
				var file = grunt.file.read(jsf);
                var name = path.basename(jsf).split('.')[0];
				builder.addJs(name, file);
			});
		}
		
		if (files != null)
		{
			files.forEach(function(f){
                if (f == null) return;
                
				console.log('adding arbitrary file: '+f);
				var file = grunt.file.read(f);
				var name = path.basename(f).split('.')[0];
				
				builder.addFile(name, file);
			});
		}
		
		var result = builder.toString();
		
		grunt.log.writeln('Writing '+options.output+'..');
		grunt.file.write(options.output, result, { encoding: 'UTF-8' });
		grunt.log.writeln('Packaged file '+options.output+' written.');
	});
	
};