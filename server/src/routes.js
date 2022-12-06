import { Router } from "express";
import tokenValiMiddleware from './middlewares/tokenValiMiddleware'
import heathCheckController from "./use-cases/heathCheck/index";
import LoginController from "./use-cases/login/index"
import serverInfoController from "./use-cases/serverInfo";
import { CreateUserFtpController, ReadUserFtpController, UpdateUserFtpController, DeleteUserFtpController } from "./use-cases/usersFtpCrud"
import {CreateUserAdminController, ReadUserAdminController, UpdateUserAdminController, DeleteUserAdminController } from "./use-cases/usersAdminCrud"


export const routes = Router()

// Rotas publicas
routes.get("/heathcheck", heathCheckController)

routes.post("/login", LoginController )

// Rotas privadas

routes.get("/serverinformation", tokenValiMiddleware, serverInfoController )


// Rotas CRUD para contas FTP
routes.post("/createftpuser",tokenValiMiddleware, CreateUserFtpController )

routes.get("/getftpusers", tokenValiMiddleware, ReadUserFtpController )

routes.put("/updateftpuser", tokenValiMiddleware, UpdateUserFtpController )

routes.delete("/deleteftpuser", tokenValiMiddleware, DeleteUserFtpController )

// Rotas  CRUD para usuários admins

routes.post("/createadminuser", tokenValiMiddleware, CreateUserAdminController)

routes.get("/getadminusers", tokenValiMiddleware, ReadUserAdminController)

routes.put("/updateadminuser", tokenValiMiddleware, UpdateUserAdminController)

routes.delete("/deleteadminuser", tokenValiMiddleware, DeleteUserAdminController)
