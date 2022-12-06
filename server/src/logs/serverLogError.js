import logger from "./logger.js"

export default (errorToLog) => {
	logger.error("Error:" + " " + errorToLog)
}
