import CreateUserAdminUseCase from "./Create/"
import ReadUserAdminUseCase from "./Read/"
import UpdateUserAdminUseCase from "./Update/"
import DeleteUserAdminUseCase from "./Delete/"

const CreateUserAdminController =  CreateUserAdminUseCase
const ReadUserAdminController =  ReadUserAdminUseCase
const UpdateUserAdminController =  UpdateUserAdminUseCase
const DeleteUserAdminController =  DeleteUserAdminUseCase



export {CreateUserAdminController, ReadUserAdminController, UpdateUserAdminController, DeleteUserAdminController }