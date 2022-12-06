import serverLogError from "../../../logs/serverLogError"
import Admin from "../../../models/Admin"


export default async (req, res) => {

	try {
		const { Id } = req.query

        if(!Id) return res.status(401).json({ status: "O Campo Id é requerido" })

		const UserExistingVerify = await Admin.findOne({ where: { id: Id }})

        if(!UserExistingVerify) return res.status(401).json({ status: `Usuário inexistente` })

        await Admin.destroy({ where: { id: Id }})

        res.status(200).json({ status: `Usuário  excluido com sucesso !!`})		

	} catch (error) {
		serverLogError(error)
        res.status(401).json({ status: "Houve um erro, tente novamente"})
        
	}
}
