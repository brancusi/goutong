module.exports = function(env) {
  return {
    clientAllowedKeys: ['TOKEN_ENDPOINT', 'TRANSLATION_ENDPOINT'],
    // Fail build when there is missing any of clientAllowedKeys environment variables.
    // By default false.
    failOnMissingKey: true,
  };
};
