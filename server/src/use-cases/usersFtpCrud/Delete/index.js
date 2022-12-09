import serverLogError from "../../../logs/serverLogError"
import FtpAccounts from "../../../models/FtpAccounts"
import {RootFtpDataDir} from "../../../config/RootFtpDataDir"
import {rm} from "fs/promises"

export default async (req, res) => {

	try {
		const { User } = req.query

		const UserExistingVerify = await FtpAccounts.findOne({ where: { User: User }})

		if(UserExistingVerify){
			const PathdirUser = `${RootFtpDataDir}/${User}`
			await FtpAccounts.destroy({ where: { User: User }})
			await rm(PathdirUser, {recursive: true, force: true})
			res.status(200).json({ status: `Usuário ${User} excluido com sucesso !!`})
		}else{
			res.status(400).json({ status: `Usuário ${User} não existe.`})
		}
		

	} catch (error) {
		serverLogError(error)
	}

}
