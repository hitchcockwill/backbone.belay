module.exports = function(grunt) {
  // set up grunt

  // Coffeescript compile
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      compile: {
        files: {
          'backbone.belay.js': 'backbone.belay.coffee',
          'spec/javascripts/belay.spec.js': 'spec/javascripts/belay.spec.coffee'
        },
        options: {
          bare: true
        }
      }
    },

    watch: {
      coffee: {
        files: ['**/*.coffee'],
        tasks: ['coffee']        
      },
      test: {
        files: ['spec/belay.spec.js'],
        tasks: ['jasmine']
      }
    },

    jasmine: {
      'belay': {
        src : ['backbone.belay.js', 'public/**/*.js'],
        options: {
          specs : 'spec/*.spec.js'
        }
      }
    }
  }); 
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.registerTask('default', ['coffee', 'watch', 'jasmine']);


  // Listen for events when files are modified
  grunt.event.on('watch', function(action, filepath) {
    grunt.log.writeln(filepath + ' has ' + action);
  });

};