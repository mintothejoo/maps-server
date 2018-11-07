import winston from 'winston';
import expressWinston from 'express-winston';
import config from './../config/config';
const tsFormat = () => new Date().toLocaleTimeString();

export const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
    //   json: true,
      timestamp: tsFormat,
      colorize: true,
    }),
  ],
  meta: false,
  msg: 'HTTP {{req.method}} {{req.url}}',
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  ignoreRoute(req, res) {
    return false;
  },
});

let files = { transports: [] };
config.logger.files.forEach(definition => {
  const transport = new winston.transports.File(definition);
  files.transports.push(transport);
});

export const errorLogger = expressWinston.errorLogger(files);
