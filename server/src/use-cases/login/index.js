import serverLogError from "../../logs/serverLogError"
import jsonwebtoken from "jsonwebtoken";
import Admin from '../../models/Admin'
import "dotenv/config"
import md5 from "md5";
import {TokenPrivateKey} from "../../config/TokenPrivateKey"


export default async (req, res) => {

	try {

		const { Username, Password } = req.body

        if(!Username || !Password) return res.status(401).json({status: "Campo Username e Password são requeridos "})

        const UserAuth = await Admin.findOne({ where: {Username: Username}})

        if(!UserAuth) return res.status(401).json({status: "Usuário inexistente"})


        const correctCredentials = md5(Password) === UserAuth.Password


        if(!correctCredentials) return res.status(401).json({status: "Password incorrect"})

        const token = jsonwebtoken.sign(
            { user: JSON.stringify(UserAuth.Password) },
            TokenPrivateKey,
            { expiresIn: '60m' }
          );

		return res.status(200).json({ User:UserAuth.Username, token } );
	} catch (error) {
		serverLogError(error)
		res.status(400).send({ error: 'Houve um Erro, tente novamente !!' })
	}
}