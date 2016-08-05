'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'src/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },
    tasksRelation: {
      files: []
    },
    watch: {
      tasks: ['clean', 'jshint'],
      scripts: {
        files: 'src/**/*.js',
        tasks: ['jshint'],
        options: {
          interrupt: true,
        }
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('src');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['jshint', 'clean', 'tasksRelation']);

  // for test
  grunt.registerTask('test1', ['tasksRelation']);
};