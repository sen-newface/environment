const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .js('resources/js/js-todo-list/index.js', 'public/js/js-todo-list')
  .ts('resources/ts/ts-todo-list/index.ts', 'public/js/ts-todo-list')
  .copy('resources/css/js-todo-list.css', 'public/css/js-todo-list.css')
  .sass('resources/sass/app.scss', 'public/css');
