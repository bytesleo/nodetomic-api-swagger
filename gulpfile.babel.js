import fs from 'fs';
import chalk from 'chalk';
import gulp from 'gulp';
import babel from 'gulp-babel';
import rename from 'gulp-rename';
import clean from 'gulp-rimraf';
import minify from 'gulp-minifier';
import jeditor from "gulp-json-editor";
import runSequence from 'run-sequence';
import config from './src/config';

const dist = './dist';
const dist_server = `${dist}/server`;
const dist_swagger = `${dist_server}/core/swagger/api-docs`;
const dist_client = `${dist}/client`;
const pm2_simple = `simple.config.js`;
const pm2_cluster = `cluster.config.js`;

gulp.task('build', () => {
  runSequence('build-clean', 'build-babel', 'build-replace');
});

gulp.task('build-clean', () => {
  // Remove files dist, but ignore assets
  return gulp.src([
    `${dist_server}/*`, `!${dist_server}/assets`
  ], { read: false }).pipe(clean({ force: true }));
});

gulp.task('build-babel', () => {
  // Babel transform, ignore config and swagger api-docs
  return gulp.src(['src/**/*.js', '!src/config/*.js', '!src/core/swagger/api-docs/*']).pipe(babel()).pipe(gulp.dest(dist_server));
});

gulp.task('build-replace', () => {
  // Copy config production
  gulp.src(["src/config/production.js"]).pipe(babel()).pipe(rename('index.js')).pipe(gulp.dest(`${dist_server}/config`));
  // Copy views
  gulp.src(['src/views/**/*.{html,css}']).pipe(minify({ minify: true, collapseWhitespace: true, conservativeCollapse: true, minifyJS: true, minifyCSS: true })).pipe(gulp.dest(`${dist_server}/views`));
  // Copy assets
  gulp.src(['src/assets/**/*']).pipe(gulp.dest(`${dist_server}/assets`));
  // Copy *.yaml
  gulp.src(['src/**/*.yaml']).pipe(gulp.dest(dist_server));
  // Copy swagger/api-docs
  gulp.src([`src/core/swagger/api-docs/*`]).pipe(gulp.dest(dist_swagger));
  // package.json
  gulp.src("package.json").pipe(jeditor((json) => {
    delete json.devDependencies;
    json.scripts = {
      "start": `npm run redis && node server/app.js`,
      "simple": `npm run redis && npm stop && pm2 startOrRestart ${pm2_simple}`,
      "cluster": `npm run redis && npm stop && pm2 startOrRestart ${pm2_cluster}`,
      "dev-simple": `npm run simple && pm2 monit`,
      "dev-cluster": `npm run cluster && pm2 monit`,
      "redis": `redis-cli config set notify-keyspace-events KEA`,
      "stop": `pm2 delete ${pm2_simple} ${pm2_cluster}`
    };
    return json;
  })).pipe(gulp.dest(dist));
  // Copy pm2 files
  gulp.src([pm2_simple, pm2_cluster]).pipe(gulp.dest(dist));
  // If not exits client folder, then copy current client
  if (!fs.existsSync(`${dist}/client`)) {
    gulp.src(['client/*','!**/*.js']).pipe(minify({ minify: true, collapseWhitespace: true, conservativeCollapse: true, minifyCSS: true })).pipe(gulp.dest(dist_client));
    gulp.src(['client/**/*.js']).pipe(babel()).pipe(gulp.dest(dist_client));
  }
  // Success
  setTimeout(() => console.log(chalk.greenBright('\n---------\nBuild success!\n---------\n')), 500);
});
