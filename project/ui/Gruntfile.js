module.exports = function (grunt) {
	
	grunt.initConfig({
		server: {
			port: 8080,
			base: './web-root'
		  },
	  concat: {
		js: {
		  src: [
		  'app/scripts/jquery.batchImageLoad.js'
		  ,'app/scripts/fastclick.js'
		  ,'app/scripts/app.js'
		  ,'app/scripts/iphone-zoom.js'
		  ,'app/scripts/google-spreadsheet.js'
		  ,'app/services/services.js'
		  ,'app/home/HomeCtrl.js'
		  ,'app/giftbox/giftbox.js'
		  ,'app/ListOfItems/ListController.js'
		  ,'app/item/ItemController.js'
		  ,'app/cart/CartCtrl.js'
		  ,'app/check-out/checkout.js'
		  ,'app/user/userctrl.js' 
	      ,'app/directives/FlipCard/FlipCardDirective.js'
		  ,'app/directives/ItemCard/ItemCardDirective.js'
		  ,'app/directives/CartItemCard/CartItemCardDirective.js'
		  ,'app/directives/FBDirective.js'
		  ],
		  dest: 'app/dist/built.js',
		},
		bowerjs: {
		  src: [
			'bower_components/jquery/dist/jquery.js'
			,'bower_components/blockui/jquery.blockUI.js'
			,'bower_components/angular/angular.js'
			,'bower_components/bootstrap/dist/js/bootstrap.js'
			,'bower_components/angular-animate/angular-animate.js'
			,'bower_components/angular-ui-router/release/angular-ui-router.js'
			,'bower_components/ng-table/dist/ng-table.min.js'
		  ],
		  dest: 'app/dist/bower-built.js',
		},
		css: {
		  src: [
		  'app/styles/loading.css'
		  , 'app/styles/main.css'
		  ],
		  dest: 'app/dist/built.css',
		}
	  },
	  watch: {
		js: {
			files: ['app/**/*.js','app/**/!*.min.js'],
			tasks: ['concat:js','uglify:js']
		},
		css: {
			files: 'app/styles/*.css',
			tasks: ['concat:css','cssmin']
		}
		},
	  uglify: {
		  options: {
			mangle: false
		  },
		js: {
		  src: ['app/dist/built.js'],
		  dest: 'app/dist/built.min.js',
		},
		bowerjs: {
		  src: ['app/dist/bower-built.js'],
		  dest: 'app/dist/bower-built.min.js',
		}
		},
		cssmin: {
		  target: {
			files: [{
			  expand: true,
			  src: ['app/dist/built.css'],
			  dest: '',
			  ext : '.min.css'
			}]
		  }
		}
		
	});
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.registerTask('default',['concat','uglify','cssmin'])	;
	grunt.loadNpmTasks('grunt-serve');
	grunt.registerTask('server', 'Start a custom web server.', function() {
	  grunt.log.writeln('Starting web server on port 1234.');
	  require('server.js').listen(1234);
	});
		
};