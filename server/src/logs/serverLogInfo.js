import logger from "./logger.js"

export default (messageToLog, value = "") => {
	switch (messageToLog) {
		case "authorization":
			logger.info(
				"authorization" +
					" " +
					"received" +
					" " +
					JSON.stringify(value, null, "\t")
			)

			break

		case "create":
			logger.info(
				"create" +
					" " +
					"request received" +
					" " +
					JSON.stringify(value, null, "\t")
			)

			break

		case "read":
			logger.info(
				"read" +
					" " +
					"request received" +
					" " +
					JSON.stringify(value, null, "\t")
			)

			break

		case "update":
			logger.info(
				"update" +
					" " +
					"request received" +
					" " +
					JSON.stringify(value, null, "\t")
			)

			break

		case "delete":
			logger.info(
				"delete" +
					" " +
					"request received" +
					" " +
					JSON.stringify(value, null, "\t")
			)

			break

		default:
			logger.info(messageToLog)

			break
	}
}
