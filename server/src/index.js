import express from "express"
import cors from "cors"
import "dotenv/config"
import md5 from "md5"
import Database from "./config/databaseConfig"
import {routes} from "./routes"
import serverLogInfo from "./logs/serverLogInfo"
import serverLogError from "./logs/serverLogError"
import Admin from './models/Admin'

const serverApp = express()

serverApp.use(cors())
serverApp.use(express.json())

serverApp.use("/api",routes)

serverApp.listen(process.env.SERVER_LISTEN_PORT || 3000, () => {
		serverLogInfo(`SERVER_LISTEN_PORT: ${process.env.SERVER_LISTEN_PORT}`)
})

Database.authenticate()
	.then(() => {
		serverLogInfo('Database successfully connected !!')
		Admin.sync()
			.then((info) => {
				Admin.findOne({ where: { Username: 'admin' }})
					.then((userAdmin) => {
						if(!userAdmin){
							Admin.create({ Username: 'admin', Password: md5(process.env.ADMIN_PASSWORD || 'admin' ) })
							.then(() => {
								serverLogInfo('User admin create')
								serverLogInfo('Sync Complete')
							})
							.catch((e) => serverLogError(e.message) )
						}
					})

			})
		    .catch(e => console.log(e))
	})
	.catch(e => serverLogError(e.message))
