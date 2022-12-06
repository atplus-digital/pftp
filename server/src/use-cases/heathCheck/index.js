import serverLogInfo from "../../logs/serverLogInfo"
import serverLogError from "../../logs/serverLogError"


export default async (req, res) => {

	try {

        serverLogInfo('API Running')

		
		return res.status(200).json({ status: "API Running" } );
	} catch (error) {
		serverLogError(error)
		res.status(400).send({ error: 'Houve um Erro, tente novamente !!' })
	}
}