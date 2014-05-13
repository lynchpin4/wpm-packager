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
					output: 'packages/test.json',
                    context: 'page',
                    autoload: false
				},
				
				files: {
					js: ['test/somejs.js'],
					css: ['test/test.css'],
					files: ['test/index.html']
				}
			},
            
            wpm: {
                options: {
                    name: 'wpm',
                    output: 'packages/wpm.js',
                    context: 'page',
					root: 'testmarket'
                },
                
                files: {
					js: ['js/jquery.js', 'js/jquery.tmpl.min.js', 'js/jquery-ui-1.9.2.custom.js', 'js/jstorage.min.js', 'js/slimScroll.min.js', 'js/slimScroll.min.js', 'js/bootstrap-transition.js', 'js/bootstrap-alert.js', 'js/bootstrap-modal.js', 'js/bootstrap-tab.js', 'js/bootstrap-tooltip.js', 'js/bootstrap-button.js', 'js/bootstrap-collapse.js', 'js/market.js'],
					css: ['css/bootstrap.css', 'css/bootstrap-responsive.css', 'css/market.css'],
					files: ['html/market-fragment.html']
                }
            }
		}
	};
	/*
	<script src="../js/jquery.js"></script>
	<script src="../js/jquery.tmpl.min.js"></script>
	<script src="../js/jquery-ui-1.9.2.custom.js"></script>
	<script src="../js/jstorage.min.js"></script>
	<script src="../js/slimScroll.min.js"></script>
	<script src="../js/bootstrap-transition.js"></script>
	<script src="../js/bootstrap-alert.js"></script>
	<script src="../js/bootstrap-modal.js"></script>
	<script src="../js/bootstrap-tab.js"></script>
	<script src="../js/bootstrap-tooltip.js"></script>
	<script src="../js/bootstrap-button.js"></script>
	<script src="../js/bootstrap-collapse.js"></script>
	<script src="../js/market.js"></script>
	*/
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