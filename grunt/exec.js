// Calls Cordova using the command line (grunt-exec)
module.exports = {
  /*
  * Asks Cordova to build ios and android versions,
  * then runs ios on the ios simulator and
  * then runs android on a connected mobile device.
  */
  deploy: {
    cmd: 'cordova run android -release;',
    cwd: 'cordova',
    stdout: true,
    stderr: true
  },

  /*
  * Asks Cordova to build all available platforms.
  * TODO: Somehow automatically upload apps?
  */
  release: {
    cmd: 'cordova build -release;',
    cwd: 'cordova',
    stdout: true,
    stderr: true
  }
};
