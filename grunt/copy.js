// Copies remaining files to places other tasks can use
module.exports = {
  dist: {
    files: [{
      expand: true,
      dot: true,
      cwd: '<%= config.app %>',
      dest: '<%= config.dist %>',
      src: [
        'content/**/**.*',
        '.htaccess',
        'images/{,*/}*.webp',
        // '{,*/}*.html',
        'styles/fonts/{,*/}*.*'
      ]
    }]
  },
  www: {
    files: [{
      expand: true,
      cwd: '<%= config.dist %>',
      dest: '<%= config.www %>',
      src: ['**/*']
    }]
  },
  res: {
    files: [{
      expand: true,
      cwd: '<%= config.app %>/res',
      dest: '<%= config.www %>/res',
      src: ['**/*']
    }]
  },
  auth: {
    files: [{
      expand: true,
      cwd: '<%= config.app %>/auth',
      dest: '<%= config.platforms %>',
      src: ['**/*']
    }]
  },
  config: {
    files: [{
      expand: true,
      cwd: '<%= config.app %>',
      dest: '<%= config.cordova %>',
      src: ['config.xml']
    }]
  }
};
