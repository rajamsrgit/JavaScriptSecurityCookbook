// Import Log4js
import log4js from 'log4js';

// Configure Log4js
log4js.configure({
    appenders: { file: { type: 'file', filename: 'client-logs.log' } },
    categories: { default: { appenders: ['file'], level: 'info' } }
});

// Create a logger instance
const logger = log4js.getLogger();

// Log some messages
logger.info('This is an informational message.');
logger.warn('This is a warning message.');
logger.error('This is an error message.');
