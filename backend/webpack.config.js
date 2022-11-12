const path = require("path");
require("dotenv").config({ path: "./.env" });

const webpack = require("webpack");

const environment = process.env.ENVIRONMENT;

console.log("environment:::::", environment);

let ENVIRONMENT_VARIABLES = {
  "process.env.ENVIRONMENT": JSON.stringify("production"),
  "process.env.PORT": JSON.stringify("8080"),
  "process.env.MONGO_CONNECTION_STRING": JSON.stringify(
    process.env.MONGO_CONNECTION_STRING
  ),
  "process.env.CLOUD_NAME": JSON.stringify(process.env.CLOUD_NAME),
  "process.env.CLOUD_KEY": JSON.stringify(process.env.CLOUD_KEY),
  "process.env.CLOUD_KEY_SECRET": JSON.stringify(process.env.CLOUD_KEY_SECRET),
  "process.env.CLOUD_URL": JSON.stringify(process.env.CLOUD_URL),
};
module.exports = {
  entry: "./server.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "server.js",
  },
  target: "node",
  plugins: [new webpack.DefinePlugin(ENVIRONMENT_VARIABLES)],
};
