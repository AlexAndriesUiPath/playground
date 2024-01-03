const nxPreset = require('@nrwl/jest/preset').default;

module.exports = {
  ...nxPreset,
  setupFilesAfterEnv: ['./tools/test-setup.ts'],
};
