import serverLogError from "../../../logs/serverLogError"
import FtpAccounts from "../../../models/FtpAccounts"
import {GetQuotaUtilization}  from "./GetQuotaUtilization"

export default async (req, res) => {

	try {

		let HiddenFields = ['Password', 'Dir', 'Uid', 'Gid', 'comment']

		const userFtp = await FtpAccounts.findAll({attributes: { exclude: HiddenFields },raw: true})

		await Promise.all(userFtp.map(async(FtpAccount) => {  

			if(FtpAccount.QuotaSize > 0)FtpAccount.QuotaSize =  FtpAccount.QuotaSize / 1024

			const QuotaUtilizationUser = await GetQuotaUtilization(FtpAccount.User)

			FtpAccount.QuotaUtilization = QuotaUtilizationUser

		}))

		
		res.status(200).send(userFtp)
	} catch (error) {
		serverLogError(error)
		res.status(400).send({ error: 'Houve um Erro, tente novamente !!' })
	}
}
