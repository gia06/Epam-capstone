import pino from 'pino';

const pretty = pino.transport({
  target: 'pino-pretty',
  options: {
    translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
    ignore: 'pid,hostname',
  },
});

// export const logger = pino({
//   prettyPrint: process.env.NODE_ENV === 'development',
// });

export const logger = pino(process.env.NODE_ENV === 'development' ? pretty : {});
