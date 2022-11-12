import gulp from "gulp";
const { src, dest, series, parallel } = gulp;
import { deleteAsync as del } from "del";
import fs from "fs";
import zip from "gulp-zip";
import log from "fancy-log";
import webpack_stream from "webpack-stream";
import webpack_config from "./webpack.config.js";
import { exec } from "node:child_process";

const paths = {
  prod_build: "../prod-build",
  server_file_name: "server.js",
  react_src: "../frontend/build/**/*",
  react_dist: "../prod-build/frontend/build",
  zipped_file_name: "jobtracker-prod.zip",
};

function clean() {
  log("removing the old files in the directory");
  return del("../prod-build/**", { force: true });
}

function createProdBuildFolder() {
  const dir = paths.prod_build;
  log(`Creating the folder if not exist  ${dir}`);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    log("📁  folder created:", dir);
  }

  return Promise.resolve("the value is ignored");
}

function buildReactCodeTask(cb) {
  log("building React code into the directory");
  return exec(
    "cd ../frontend && npm run build",
    function (err, stdout, stderr) {
      log(stdout);
      log(stderr);
      cb(err);
    }
  );
}

function copyReactCodeTask() {
  log("copying React code into the directory");
  return src(`${paths.react_src}`).pipe(dest(`${paths.react_dist}`));
}

function copyNodeJSCodeTask() {
  log("building and copying server code into the directory");
  return webpack_stream(webpack_config).pipe(dest(`${paths.prod_build}/`));
}

function zippingTask() {
  log("zipping the code ");
  return src(`${paths.prod_build}/**`)
    .pipe(zip(`${paths.zipped_file_name}`, { noDir: true }))
    .pipe(dest(`${paths.prod_build}`));
}

export default series(
  clean,
  createProdBuildFolder,
  buildReactCodeTask,
  parallel(copyReactCodeTask, copyNodeJSCodeTask),
  zippingTask
);
