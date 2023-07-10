module.exports = ({ env }) => {
  const envConfig = require(`./webpack.${env}.js`);
  return envConfig;
};
