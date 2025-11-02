// crypto-polyfill.js
if (typeof crypto === 'undefined') {
  global.crypto = require('crypto').webcrypto;
}