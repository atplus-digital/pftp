import serverLogError from "../../../logs/serverLogError"
import Admin from "../../../models/Admin"
import md5 from "md5"

export default async (req, res) => {

	try {

		const { Username, Password } = req.body

        if( !Username || !Password ) return res.status(400).json({ status: "O campo User e Password são requeridos"} )

        const UserExistingVerify = await Admin.findOne({ where: { Username: Username }})

        if( UserExistingVerify ) return res.status(409).json({ status: `Usuário ${Username} já existe`} )

        const UserCreated = await Admin.create({ Username: Username, Password: md5(Password) })

		const outputFilter = Object.entries(UserCreated.dataValues).filter( field => !['Password', 'updatedAt', 'createdAt'].includes(field[0]))

		const outputReturn = Object.fromEntries(outputFilter)

        res.status(200).json({status: "ok", UserInfo: outputReturn})
		   		
	} catch (error) {
		serverLogError(error)
		res.status(400).send({ error: 'Houve um Erro, tente novamente !!' })
	}
}