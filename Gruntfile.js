/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:bitmap.json>',
    meta: {
      banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %>\n' + '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' + ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */ \n debug=false;'
    },
    concat: {
      dist: {
        src: ['src/js/app.js', 'src/js/routes.js'],
        dest: '/Users/ccmiller/git/bitmap/js/bitmap.min.js'
      }
    },
    recess: {
      dist: {
        src: ['src/css/app.less'],
        dest: '/Users/ccmiller/git/bitmap/css/app.min.css',
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
        '/Users/ccmiller/git/bitmap/js/models.min.js':'src/js/models.js',
        '/Users/ccmiller/git/bitmap/js/views.min.js':'src/js/views.js',
      }
    }
  },
    copy: {
      dist: {
        files: [
        // {expand: true, cwd: 'src/',src: 'index.php', dest: 'dist', filter: 'isFile'},
        // {expand: true, flatten:true,src: 'README.md', dest: 'dist', filter: 'isFile'}
        // ,
        // {expand: true, cwd: 'src/css/', src: ['styles.ie.css'], dest: 'dist/css', filter: 'isFile'}
        // ,
        // {expand: true, cwd: 'src/lib/',src: ['leaflet/leaflet.css'], dest: '/Users/ccmiller/git/bitmap/lib/leaflet/leaflet.css'},
        // {expand: true, cwd: 'src/lib/',src: ['nprogress.css'], dest: '/Users/ccmiller/git/bitmap/lib/nprogress.css'},
        {expand: true, cwd: 'src/css/',src: ['fonts/**'], dest: '/Users/ccmiller/git/bitmap/css/'},
        {expand: true, cwd: 'src/',src: ['offline/**'], dest: '/Users/ccmiller/git/bitmap/'},
        {expand: true, cwd: 'src/',src: ['images/**'], dest: '/Users/ccmiller/git/bitmap/'},
        // {expand: true, cwd: 'src/js',src: ['templates/**'], dest: '/Users/ccmiller/git/bitmap/js'},
        {expand: true, cwd: 'src/lib',src: ['**'], dest: '/Users/ccmiller/git/bitmap/lib'},
        // {expand: true, cwd: 'src/css/',src: ['app.less'], dest: '/Users/ccmiller/git/bitmap/css/', filter: 'isFile'},
        {expand: true, cwd: 'src/js/',src: ['globals-dist.js'], dest: '/Users/ccmiller/git/bitmap/js/',
      rename: function(dest, src) {
        return dest + src.replace('-dist','');
      }, filter: 'isFile'},
      {expand: true, cwd: 'src/',src: ['index-dist.html'], dest: '/Users/ccmiller/git/bitmap/',
      rename: function(dest, src) {
        return dest + src.replace('-dist','');
      }, filter: 'isFile'},
        {expand: true, cwd: 'src/js/',src: ['h-templates-compiled.js'], dest: '/Users/ccmiller/git/bitmap/js', filter: 'isFile'},
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
  grunt.registerTask('default', ['concat'
    ,'recess'
    ,'uglify','copy'
    ]);

};