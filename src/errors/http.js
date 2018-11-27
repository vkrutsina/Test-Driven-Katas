const Sentry = require('@sentry/node');
const config = require('../../config.json');

Sentry.init({ dsn: config.sentry.dsn, environment: process.env.NODE_ENV || 'development' });

class HttpError {

  static log(error) {
    console.error('[ERR][HTTP]', error);
    if (process.env.NODE_ENV !== 'development') {
      Sentry.captureException(err);
    }
  }

}

module.exports = HttpError;
