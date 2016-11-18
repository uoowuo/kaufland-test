/**
 * Kaufland test, v1.1.1
 *
 * Description: A test for Kaufland.
 */

require('es6-promise').polyfill();  // of course IE

window.jQuery = require('jquery');
window.$ = window.jQuery;
require('bootstrap');
require('bootstrap-submenu-hover');
require('bootstrap-hover-dropdown');
import App from './classes/app.js';

 // Application start
(function (globals) {
    'use strict';

    document.addEventListener('DOMContentLoaded', function (event) {

        jQuery('[data-submenu]').submenupicker();

        const area = document.querySelector('#content-area');
        globals.app = new App(area);  // access state for debugging at window.app
    });
    
}(self));