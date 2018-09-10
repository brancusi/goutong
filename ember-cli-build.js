'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const sass = require('sass');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    sassOptions: {
      implementation: sass
    }
  });

  app.import('node_modules/twilio-video/dist/twilio-video.min.js', {
    using: [
      { transformation: 'amd', as: 'twilio-video' }
    ]
  });

  app.import('node_modules/recordrtc/RecordRTC.min.js', {
    using: [
      { transformation: 'cjs', as: 'record-rtc' }
    ]
  });



  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
