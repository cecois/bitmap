/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:leo.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */ \n debug=false;'
    },
    concat: {
      dist: {
        src: ['src/js/app.js', 'src/js/routes.js'],
        dest: 'dist/js/leo.min.js'
      }
      // ,
      // models: {
      //   src: ['src/js/models/*.js'],
      //   dest: 'dist/js/models.js'
      // }
    },
    recess: {
      dist: {
        src: ['src/css/styles.less','src/css/styles-responsive.less','src/css/banner.css'],
        dest: 'dist/css/styles.min.css',
        options: {
          compile: true,
          compress:true
        }
      }
    },
    uglify: {
    options: {
      mangle: false
    },
    my_target: {
      files: {
        // 'dist/js/leo.min.js': ['<config:concat.app.dest>']
        'dist/js/models.min.js':'src/js/models/*.js',
        'dist/js/views.min.js':'src/js/views/*.js',
      }
    }
  },
    copy: {
      dist: {
        files: [
        {expand: true, cwd: 'src/',src: 'index.php', dest: 'dist', filter: 'isFile'},
        {expand: true, flatten:true,src: 'README.md', dest: 'dist', filter: 'isFile'}
        ,
        {expand: true, cwd: 'src/css/', src: ['styles.ie.css'], dest: 'dist/css', filter: 'isFile'}
        ,
        {expand: true, cwd: 'src/',src: ['images/**'], dest: 'dist'},
        {expand: true, cwd: 'src/js',src: ['templates/**'], dest: 'dist/js'},
        {expand: true, cwd: 'src/lib',src: ['**'], dest: 'dist/lib'},
        {expand: true, cwd: 'src/js/',src: ['Handlebars.templates.js','routes.js'], dest: 'dist/js'},
        {expand: true, cwd: 'src/js/models',src: '*.min.json', dest: 'dist/js/models'}
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-recess');
  // grunt.loadNpmTasks('grunt-groundskeeper');
  // Default task.
  grunt.registerTask('default', ['concat','recess','uglify','copy']);

};