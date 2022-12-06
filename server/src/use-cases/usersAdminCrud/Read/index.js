import serverLogError from "../../../logs/serverLogError"
import Admin from "../../../models/Admin"

export default async (req, res) => {

	try {


		let HiddenFields = ['Password']

		const usersAdmin = await Admin.findAll({attributes: { exclude: HiddenFields }}
		)
        		
		res.send(usersAdmin)
	} catch (error) {
		serverLogError(error)
		res.status(400).send({ error: 'Houve um Erro, tente novamente !!' })
	}
}