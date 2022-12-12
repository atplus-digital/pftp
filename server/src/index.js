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

const serverApp = express()

serverApp.use(cors())
serverApp.use(express.json())

serverApp.use("/api",routes)

serverApp.listen(process.env.SERVER_LISTEN_PORT || 3000, () => {
		serverLogInfo(`SERVER_LISTEN_PORT: ${process.env.SERVER_LISTEN_PORT}`)
})


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

