import md5 from "md5"
import FtpAccounts from "../../../models/FtpAccounts"
import serverLogError from "../../../logs/serverLogError"
export default  async (req, res) => {

	try {

		const { User, Password } = req.body

		if( !User || !Password ) return res.status(400).json({ status: "O campo User e Password são requeridos"} )
		

		const UserExistingVerify = await FtpAccounts.findOne({ where: { User: User }})

		if(!UserExistingVerify){

			const fieldsAvailable = [ "User" , 'status', 'Password', 'ULBandwidth', 'DLBandwidth', 'comment', 'ipaccess', 'QuotaSize',  'QuotaFiles']

			var ValidationFields = Object.entries(req.body).filter(field => fieldsAvailable.includes(field[0]) )
	
			const QueryCreate = Object.fromEntries(ValidationFields)
	
			QueryCreate.Password = md5(QueryCreate.Password)

			QueryCreate.QuotaSize = QueryCreate.QuotaSize * 1024

			QueryCreate.Dir = `/ftpdata/${QueryCreate.User}`

			const createUserFTP = await FtpAccounts.create(QueryCreate)

			const outputFilter = Object.entries(createUserFTP.dataValues).filter( field => !['Password', "Dir", "Uid", "Gid"].includes(field[0]))
			
			const outputReturn = Object.fromEntries(outputFilter)

			outputReturn.QuotaSize = outputReturn.QuotaSize / 1024

			res.status(200).json({status: "ok", UserInfo: outputReturn })
		}else{
			res.status(409).json({ status: `Usuário ${User} já existe`} )
		}
	} catch (error) {
		serverLogError(error)
	}

}
