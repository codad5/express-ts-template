import { existsSync, mkdirSync, access } from 'fs';
import { join } from 'path';
import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';

const { LOG_DIR } = process.env;

// Logs directory
const logDir = join(__dirname, LOG_DIR ?? '../logs');

if (!existsSync(logDir)) {
  mkdirSync(logDir);
}

// Define log format
const logFormat = winston.format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`);

let logger: winston.Logger | null = null;
let stream;

// Check if write permission is granted
access(logDir, (err) => {
  if (err) {
    // No write permission, export logger and stream as null
    logger = null;
    stream = null;
  } else {
    // Write permission granted, create the logger and stream
    logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        logFormat,
      ),
      transports: [
        // Debug log setting
        new winstonDaily({
          level: 'debug',
          datePattern: 'YYYY-MM-DD',
          dirname: logDir + '/debug', // Log file /logs/debug/*.log to be saved
          filename: `%DATE%.log`,
          maxFiles: 30, // 30 days saved
          json: false,
          zippedArchive: true,
        }),
        // Error log setting
        new winstonDaily({
          level: 'error',
          datePattern: 'YYYY-MM-DD',
          dirname: logDir + '/error', // Log file /logs/error/*.log to be saved
          filename: `%DATE%.log`,
          maxFiles: 30, // 30 days saved
          handleExceptions: true,
          json: false,
          zippedArchive: true,
        }),
      ],
    });

    logger.add(
      new winston.transports.Console({
        format: winston.format.combine(winston.format.splat(), winston.format.colorize()),
      }),
    );

    stream = {
      write: (message: string) => {
        logger?.info(message.substring(0, message.lastIndexOf('\n')));
      },
    };
  }
});

export { logger, stream };
