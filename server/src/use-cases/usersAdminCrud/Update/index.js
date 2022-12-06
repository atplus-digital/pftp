import serverLogError from "../../../logs/serverLogError"
import serverLogInfo from "../../../logs/serverLogInfo"
import md5 from "md5"
import Admin from "../../../models/Admin"

export default async (req, res) => {
    try {

        const UserUpdate = req.body

        if( !UserUpdate.Id) return res.status(400).json({ status: "O campo Id é Obrigatório"} )

        if(!UserUpdate.Username && !UserUpdate.Password) return res.status(400).json({ status: "Você precisa passar um dos campos Username ou Password"} )

        // const UserNameExistingVerify = await Admin.findOne({ where: { Username: UserUpdate.Username }})

        const UserExistingVerify = await Admin.findOne({ where: { id: UserUpdate.Id }})

        if(!UserExistingVerify) return res.status(400).json({ status: `Usuário inexistente` })


        if(UserUpdate.Username){
            const UserNameExistingVerify = await Admin.findOne({ where: { Username: UserUpdate.Username }})

            if( UserNameExistingVerify && UserNameExistingVerify.id !==  UserUpdate.Id)return(res.status(409).json({ status: `Usuário ${UserUpdate.Username} já existe`}))
        }

        var ValidationFields = Object.entries(UserUpdate).filter(field => [ "Username", "Password"].includes(field[0]) )


        const QueryUpdate = Object.fromEntries(ValidationFields)

        if(QueryUpdate.Password ) QueryUpdate.Password =  md5(QueryUpdate.Password)

        
        await Admin.update(QueryUpdate,{ where: { id: UserUpdate.Id }})

        res.status(200).json({ status: "Usuário atualizado com sucesso !!" })
        
    } catch (error) {
        serverLogError(error)
		res.status(400).json('Ocorreu algum erro, tente novamente..')
    }
}