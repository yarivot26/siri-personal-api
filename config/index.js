const { ACTIONSTABLENAME, SNSPREFIX, SUPPORTEDMODULES } = process.env;
const config = {
  actionsTableName: ACTIONSTABLENAME,
  snsPrefix: SNSPREFIX,
  supportedModules: SUPPORTEDMODULES,
};
Object.freeze(config);

module.exports = config;
