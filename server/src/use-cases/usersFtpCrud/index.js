import ReadUserFtpUseCase from "./Read/"
import CreateUserFtpUseCase from "./Create/"
import UpdateUserFtpUseCase from "./Update/"
import DeleteUserFtpUseCase from "./Delete/"


const CreateUserFtpController = CreateUserFtpUseCase

const ReadUserFtpController = ReadUserFtpUseCase

const UpdateUserFtpController = UpdateUserFtpUseCase

const DeleteUserFtpController = DeleteUserFtpUseCase

export {ReadUserFtpController, CreateUserFtpController, UpdateUserFtpController, DeleteUserFtpController}