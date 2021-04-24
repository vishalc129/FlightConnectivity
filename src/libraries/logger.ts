import * as logger from 'loglevel';

logger.setLevel(logger.levels.WARN);
if (process.env.NODE_ENV === `development`) {
    logger.setLevel(logger.levels.DEBUG);
}

export default logger;