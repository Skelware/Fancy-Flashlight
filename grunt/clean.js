// Empties folders to start fresh
module.exports = {
  dist: {
    files: [{
      dot: true,
      src: [
        '.tmp',
        '<%= config.dist %>/*',
        '!<%= config.dist %>/.git*'
      ]
    }]
  },
  www: {
    files: [{
      dot: true,
      src: [
      '<%= config.dist %>/*'
      ]
    }]
  },
  server: '.tmp'
};
