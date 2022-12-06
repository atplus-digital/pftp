import pino from 'pino'

export default pino({
  transport: {
    target: 'pino-pretty',
    timestap: pino.stdTimeFunctions.unixTime,
    options: {
      levelFirst: true,
      translateTime: 'SYS:standard',
      colorize: true,
    }
  }
})