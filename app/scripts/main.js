require.config({
  paths: {
    'eve': 'vendor/eve', // Needed by RaphaëlJS.
    'json2': 'vendor/json2',
    'jquery': 'vendor/jquery-1.9.1', // Supports IE6/7/8
    //'jquery': 'vendor/jquery-2.0.0',
    'jquery-imgpreload': 'vendor/jquery.imgpreload',
    'jquery-tmpl': 'vendor/jquery.tmpl',
    'jquery-ui-fx': 'vendor/jquery-ui-1.10.2.custom',
    'lodash': 'vendor/lodash', // The better underscore.js
    'random': 'vendor/random', // Python’s “random” module implementation.
    'raphael': 'vendor/raphael',
    // I’m in your data, dealing your profiles!
    'app': 'app',
    'chunkfont': 'chunkfont',
    'elem': 'dd_elem',
    'events': 'dd_events',
    'globals': 'globals',
    'imgcache': 'imgcache',
    'merger': 'merger',
    'popup': 'popup',
    'statusbar': 'statusbar',
    'tokens': 'tokens'
  }
});
require([
  // Please do not change order light-heartedly.
  'eve',
  'lodash',
  'json2',
  'jquery',
  'jquery-imgpreload',
  'jquery-tmpl',
  'jquery-ui-fx',
  'raphael',
  'random',
  // Run Joe, run Joe, eh de Datadealer at de door!
  'globals',
  'chunkfont',
  'elem',
  'events',
  'imgcache',
  'merger',
  'popup',
  'statusbar',
  'tokens',
  'app'
], function(eve) {
  // Working around issue #524 in RaphaëlJS:
  // (see https://github.com/DmitryBaranovskiy/raphael/issues/524)
  window.eve = eve;
  $(document).ready(function() {
    addRaphaelExtensions();
    load_images(function() {
      $.fn.curCss = $.fn.css;
      window.GAME = new DDGame();
    });
  });
});
