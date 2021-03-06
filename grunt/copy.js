module.exports = {
  cssSourceMap: {
    src: '<%= config.temp %>/css/styles.css.map',
    dest: '<%= config.dist %>/assets/css/styles.css.map'
  },
  fonts: {
    files: [
      {
        cwd: '<%= config.guts %>/assets/fonts/',
        src: '**',
        dest: '<%= config.dist %>/assets/fonts/',
        expand: true
      }
    ]
  },
  fastclick: {
    files: [
      {
        '<%= config.dist %>/assets/js/libraries/fastclick.js': ['<%= config.bowerDir %>/fastclick/lib/fastclick.js']
      }
    ]
  },
  img: {
    files: [
      {
        cwd: '<%= config.guts %>/assets/img/',
        src: '**',
        dest: '<%= config.dist %>/assets/img/',
        expand: true
      },
      {src: ['<%= config.guts %>/assets/img/favicon.ico'], dest: '<%= config.dist %>/favicon.ico'},
    ]
  },
  js: {
    files: [
      {
        cwd: '<%= config.guts %>/assets/js/om/libraries',
        src: '**',
        dest: '<%= config.dist %>/assets/js/om/libraries/',
        expand: true
      }
    ]
  },
  omUITest: {
    files: [
      {
        src: '<%= config.guts %>/assets/js/om/test/test.js',
        dest: '<%= config.dist %>/assets/js/om/test/',
        expand: true,
        flatten: true
      },
      {
        src: '<%= config.guts %>/assets/css/om/libraries/qunit-1.17.1.css',
        dest: '<%= config.dist %>/assets/css/',
        expand: true,
        flatten: true
      },
      {
        src: '<%= config.guts %>/assets/js/om/libraries/qunit-1.17.1.js',
        dest: '<%= config.dist %>/assets/js/om/libraries/',
        expand: true,
        flatten: true
      }
    ]
  }
};
