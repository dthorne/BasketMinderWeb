module.exports = function(grunt){
  //grunt plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-clear');
  grunt.loadNpmTasks('grunt-htmlrefs');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-clear');
  grunt.loadNpmTasks('grunt-release');
  grunt.loadNpmTasks('grunt-ngmin');

  //config
  grunt.initConfig({

    //tool for cutting new releases of this project
    release: {options: {npm: false}},

    //for tests that run in browsers
    karma: {
      //start karma server (the watch task will run the tests when files change)
      unit: {
        configFile: 'config/karma.conf.js',
        background: true
      },
      //continuous integration mode for the build: run tests once in PhantomJS browser.
      continuous: {
        configFile: 'config/karma.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      }
    },

    //for tests that run in Node
    simplemocha: {
      options: {
        require: 'should',
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'dot'
      },
      all: { src: 'test/node/**/*.js' }
    },

    //stylus css
    stylus: {
      compile: {
        //specify each "combined" file. Each file can then use @import() to bring in its dependencies
        files: {
          'app/styles/app.css': 'app/styles/app.styl'
        }
      }
    },

    //delete the previous build and generated directories
    clean: {
      build: 'build',
      generated: 'build/generated'
    },

    //copy images to the build
    copy: {
      img: {
        src: ['app/img/**'],
        dest: 'build/img'
	}
    },

    //inline all Angular templates as Strings into a JS file that can be concatted in the build
    ngtemplates: {
      options:  {base: 'app'},
      app: {
        src: ['app/templates/**/*.html'],
        dest: 'build/generated/ngtemplates.js'
      }
    },

    //replace all the script tags in the HTML file with the single built script
    htmlrefs: {
      options: {
        file: {
          buildNumber: 47878 //todo generate unique from contents of file for each file
        }
      },
      build: {
        src: 'app/index.html',
        dest: 'build/'
      }
    },

    //convert our Angular files that use simple injects to their build-safe versions
    ngmin: {
      app: {
        expand: true,
        cwd: 'app/js',
        src: ['**/*.js', '!lib/**'],
        dest: 'build/generated'
      }
    },

    //minify the HTML file (index.html)
    htmlmin: {
      index: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'build/index.html': 'build/index.html'
        }
      }
    },

    //combine all JS into one file, all CSS into one file
    concat: {
      js: {
        src: [
          'app/js/lib/angular/angular.js',
          'app/js/lib/angular/angular-resource.js',
          'build/generated/**/*.js' //all our angular components, including templates
        ],
        dest: 'build/app.js'
      },
      styles: {
        src: ['app/styles/**/*.css'],
        dest: 'build/styles/app.css'
      }
    },

    //minify the JS file to be as small as possible
    uglify: {
      app: {
        src: ['build/app.js'],
        dest: 'build/app.js'
      }
    },

    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ['app/js/**/*.js', 'app/**/*.html'],
        tasks: ['clear', 'karma:unit:run']
      },
      templates: {
        files: ['app/**/*.html'],
        tasks: ['clear', 'karma:unit:run']
      },
      tests: {
        files: ['test/browser/**/*.js'],
        tasks: ['clear', 'karma:unit:run']
      },
      styles: {
        files: ['app/styles/**/*.styl'],
        tasks: ['clear', 'stylus']
      }
    }
  });

  grunt.registerTask('test', ['karma:continuous']);
  /**
   * build task explanation
   * 1. delete the existing "build" directory.
   * 2. compile stylus into CSS.
   * 3. copy images into the build.
   * 4. generate a JS file containing all our Angular templates.
   * 5. generate build-safe versions of our Angular controllers, services, directives, filters, etc.
   * 6. combine all our scripts, including generated versions, into a single JS file. Also combine all CSS into one file.
   * 7. compress the single JS file.
   * 8. replace all our <script> tags in our index.html file with a single <script> tag pointing to the combined/compressed JS file.
   * 9. compress the index.html file.
   * 10. delete the generated directory
   */
  grunt.registerTask('build', ['clean:build', 'stylus', 'copy', 'ngtemplates', 'ngmin', 'concat', 'uglify', 'htmlrefs', 'htmlmin', 'clean:generated']);
  // 'dev' task calls 'watch' which indirectly calls 'karma:unit:run'. This expects to connect to a karma server on port 9100.
  // therefore, be sure to run the karma:unit task in a separate console when running the dev task.
  grunt.registerTask('dev', ['watch']);
};
