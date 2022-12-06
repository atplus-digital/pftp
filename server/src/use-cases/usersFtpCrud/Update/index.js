import serverLogError from "../../../logs/serverLogError"
import serverLogInfo from "../../../logs/serverLogInfo"
import md5 from "md5"
import FtpAccounts from "../../../models/FtpAccounts"

export default  async (req, res) => {

	try {


		if( !req.body.User) return res.status(400).json({ status: "O campo User é Obrigatório"} )
			
		const UserExistingVerify = await FtpAccounts.findOne({ where: { User: req.body.User }})

		if(UserExistingVerify){

			const fieldsAvailable = [ "User" , 'status', 'Password', 'ULBandwidth', 'DLBandwidth', 'comment', 'ipaccess', 'QuotaSize',  'QuotaFiles']

			var ValidationFields = Object.entries(req.body).filter(field => fieldsAvailable.includes(field[0]) )
	
	
			const QueryUpdate = Object.fromEntries(ValidationFields)
	
	
			if( QueryUpdate.Password ) QueryUpdate.Password =  md5(QueryUpdate.Password)
			

			if(QueryUpdate.QuotaSize) QueryUpdate.QuotaSize = QueryUpdate.QuotaSize * 1024


			const updateUserFTP = await FtpAccounts.update(QueryUpdate,{ where: { User: QueryUpdate.User }})
			res.status(200).json({ status: "usuario atualizado com sucesso!" })
		}else{
			res.status(400).json({ message: `Usuário ${req.body.User} não existe`} )
		}
	} catch (error) {
		serverLogError(error)
		res.status(400).json('Ocorreu algum erro, tente novamente..')
	}

}
