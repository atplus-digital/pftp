import serverLogError from "../../../logs/serverLogError"
import serverLogInfo from "../../../logs/serverLogInfo"
import FtpAccounts from "../../../models/FtpAccounts"

export default async (req, res) => {

	try {
		const { User } = req.query

		const UserExistingVerify = await FtpAccounts.findOne({ where: { User: User }})

		if(UserExistingVerify){
			await FtpAccounts.destroy({ where: { User: User }})
			res.status(200).json({ status: `Usuário ${User} excluido com sucesso !!`})
		}else{
			res.status(400).json({ status: `Usuário ${User} não existe.`})
		}
		

	} catch (error) {
		serverLogError(error)
	}

}
