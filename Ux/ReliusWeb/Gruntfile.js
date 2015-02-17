'use strict';

module.exports = function( grunt ) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    banner: '/*!\n' +
            ' * <%= pkg.name %>\n' +
            ' * Version: <%= pkg.version %>\n' +
            ' * License: <%= pkg.license %>\n' +
            ' */\n',

    jshint: {
      dev: [ 'html/resources/js/*.js' ],
      options: grunt.file.readJSON('.jshintrc')
    },

    concat: {
      js:{
        options: {
          // Replace all 'use strict' statements in the code with a single one at the top
          banner: '\'use strict\';\n\n(function () {\n\n',
          process: function(src, filepath) {
            return '  // Source: ' + filepath + '\n' +
              src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1  ');
          },
          footer: '\n})();'
        },
        files: {
          'html/resources/js/reliusadmin.js' : [ 'html/resources/js/*.js' ]
        }
      }
    },

    uglify: {
      min: {
        files: {
          'html/resources/js/reliusadmin.min.js': [ 'html/resources/js/reliusadmin.js' ]
        }
      }
    },

    usebanner: {
      build: {
        files: {
          src: [
            'html/resources/js/reliusadmin.js',
            'html/resources/js/reliusadmin.min.js'
          ]
        },
        options: {
          position: 'top',
          banner: '<%= banner %>'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-banner');

  grunt.registerTask( 'default', [
    'jshint'
  ]);

  grunt.registerTask( 'build', [
    'jshint',
    'concat',
    'uglify',
    'usebanner'
  ]);

};
