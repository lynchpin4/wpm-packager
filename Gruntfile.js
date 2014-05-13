/*
 * Gruntfile
 * http://packager.webpushers.com/
 *
 * Copyright (c) 2014 - gray @ webpushers dot com
 * Licensed under the BSD-Clause-2
 */
 
var DebuggingEnabled = false;

module.exports = function(grunt) {
	
	var config = {
		/*
		jshint: {
		  all: [
			'tasks/*.js'
		  ],
		  options: {
			jshintrc: '.jshintrc',
		  },
		},
		*/
		
		concat: {
		  options: {
			// define a string to put between each file in the concatenated output
			separator: ''
		  },
		  dist: {
			// the files to concatenate
			src: ['scripts/package_loader.js', 'scripts/microapp.js', 'scripts/bootstrap.js'],
			// the location of the resulting JS file
			dest: 'build/boot.js'
		  }
		},
		
		'closure-compiler': {
			packer: {
			  closurePath: './',
			  js: 'build/boot.js',
			  jsOutputFile: 'build/packed.js',
			  maxBuffer: 500,
			  options: {
				compilation_level: 'ADVANCED_OPTIMIZATIONS',
				language_in: 'ECMASCRIPT5_STRICT'
			  }
			}
		  },
		
		packager: {
			test: {
				options: {
					name: 'testpkg',
					output: 'build/packaged.json',
                    context: 'page'
				},
				
				files: {
					js: ['test/somejs.js'],
					css: ['test/test.css'],
					files: ['test/index.html']
				}
			}
		}
	};
	
	grunt.initConfig(config);
	
	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');
	grunt.loadNpmTasks('grunt-closure-compiler');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	
	// By default, lint and run all tests.
	grunt.registerTask('default', ['packager', 'concat'/*, 'closure-compiler' */]);
}