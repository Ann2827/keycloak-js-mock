module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-typescript'],
  plugins: [
    '@babel/plugin-transform-runtime',
    'babel-plugin-transform-import-meta',
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
  ],
};
