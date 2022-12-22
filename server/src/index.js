import express from "express"
import cors from "cors"
import "dotenv/config"
import md5 from "md5"
import Database from "./config/databaseConfig"
import {routes} from "./routes"
import serverLogInfo from "./logs/serverLogInfo"
import serverLogError from "./logs/serverLogError"
import Admin from './models/Admin'
import FtpAccounts from "./models/FtpAccounts"


// Server API
const ServerApi = express()
ServerApi.use(cors())
ServerApi.use(express.json())

ServerApi.use("/api",routes)

ServerApi.listen(process.env.API_LISTEN_PORT || 3000, () => {
		serverLogInfo(`API_LISTEN_PORT: ${process.env.API_LISTEN_PORT}`)
})

// Initial Database
;
(
	async function InitialDatabaseHandler(){
		try {
			await Database.authenticate()
			serverLogInfo('Database successfully connected !!')

			await Admin.sync()

			const UserAdminExist = await Admin.findOne({ where: { Username: 'admin' }})

			if(!UserAdminExist){
				await Admin.create({ Username: 'admin', Password: md5(process.env.ADMIN_PASSWORD || 'admin' ) })
				serverLogInfo('User admin create')
			}

			await FtpAccounts.sync()
			

		} catch (error) {
			serverLogError(error)
		} 
	}
)()

// Graceful Shutdown 
process.on('SIGTERM', () => {
    serverLogInfo('SIGTERM signal received.');
    ServerApi.close(() => serverLogInfo("HTTP server closed"))
	Database.close().then(info => serverLogInfo("Database connection closed"))
  });

  process.on('SIGILL', () => {
    serverLogInfo('SIGILL signal received.');
    ServerApi.close(() => serverLogInfo("HTTP server closed"))
	Database.close().then(info => serverLogInfo("Database connection closed"))
  });

  process.on('SIGINT', () => {
    serverLogInfo('SIGINT signal received.');
    ServerApi.close(() => serverLogInfo("HTTP server closed"))
	Database.close().then(info => serverLogInfo("Database connection closed"))
  });
