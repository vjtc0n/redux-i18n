'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTheme = setTheme;
/*
 * Project: redux-i18n
 * File: actions.js
 */

function setTheme(theme) {
  return { type: 'REDUX_I18N_SET_THEME', theme: theme };
}