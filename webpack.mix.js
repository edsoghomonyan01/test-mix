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
mix.js('resources/js/app.js', 'public/js');

mix.sass('resources/sass/pages/expired-deal.scss', 'public/mix/css/pages/expired-deal.css')
    .sass('resources/sass/pages/onboarding.scss', 'public/mix/css/pages/onboarding.css')
    .sass('resources/sass/pages/press-release.scss', 'public/mix/css/pages/press-release.css')
    .sass('resources/sass/app.scss', 'public/css')
    .sass('resources/sass/styles.scss', 'public/mix/css/styles.css');
