const config = require('../.prettierrc.cjs');

module.exports = {
    ...config,
    plugins: ['prettier-plugin-svelte'],
};
