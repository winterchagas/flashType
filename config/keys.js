module.exports = {
  googleClientID: process.env.googleClientID || '671015106200-3o85dcdrj4ngk33a3vt6v1mpdkocbcdg.apps.googleusercontent.com',
  googleClientSecret: process.env.googleClientSecret || 'albonLb7pWE-B7Q25FaEhgUu',
  firebaseConfig: {
    apiKey: process.env.apiKey || 'AIzaSyA3nUIp_IeZIaeJcCu6MytSiIYauccKUb4',
    authDomain: process.env.authDomain || 'flashtype-dev.firebaseapp.com',
    databaseURL: process.env.databaseURL || 'https://flashtype-dev.firebaseio.com',
    projectId: process.env.projectId || 'flashtype-dev',
    storageBucket: process.env.storageBucket || 'flashtype-dev.appspot.com',
    messagingSenderId: process.env.messagingSenderId || '671015106200',
    appId: process.env.appId || '1:671015106200:web:d85ec7d0bfd8908f4982ed',
    measurementId: process.env.measurementId || 'G-JY16KZJDTD'
  }
};