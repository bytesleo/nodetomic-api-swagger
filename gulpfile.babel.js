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
const dist_package = `${dist}/package.json`;
const dist_client = `${dist}/client`;
const pm2_simple = `simple.config.js`;
const pm2_cluster = `cluster.config.js`;

gulp.task('build', () => {
  runSequence('build-clean', 'build-babel', 'build-replace');
});

gulp.task('build-clean', () => {
  return gulp.src([
    `${dist_server}/*`, `!${dist_server}/assets`, dist_package
  ], {read: false}).pipe(clean({force: true}));
});

gulp.task('build-babel', () => {
  return gulp.src(['src/**/*.js','!src/config/*.js', '!src/core/swagger/api-docs/*']).pipe(babel()).pipe(gulp.dest(dist_server));
});

gulp.task('build-replace', () => {
  gulp.src(["src/config/production.js"]).pipe(babel()).pipe(rename('index.js')).pipe(gulp.dest(`${dist_server}/config`));
  gulp.src(['src/views/**/*.{html,css}']).pipe(minify({minify: true, collapseWhitespace: true, conservativeCollapse: true, minifyJS: true, minifyCSS: true})).pipe(gulp.dest(`${dist_server}/views`));
  gulp.src(['src/assets/**/*']).pipe(gulp.dest(`${dist_server}/assets`));
  gulp.src(['src/**/*.yaml']).pipe(gulp.dest(dist_server));
  gulp.src([`src/core/swagger/api-docs/*`]).pipe(gulp.dest(dist_swagger));
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

  gulp.src([pm2_simple, pm2_cluster]).pipe(gulp.dest(dist));

  if (!fs.existsSync(`${dist}/client`)) {
    gulp.src(['client/*']).pipe(minify({minify: true, collapseWhitespace: true, conservativeCollapse: true, minifyJS: true, minifyCSS: true})).pipe(gulp.dest(dist_client));
  }
  setTimeout(() => console.log(chalk.greenBright('\n---------\nBuild success!\n---------\n')), 500);
});
