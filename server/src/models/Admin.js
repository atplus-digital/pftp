import { Sequelize, Model, DataTypes } from "sequelize"
import "dotenv/config"
import Database  from "../config/databaseConfig"

const Admin = Database.define('admins', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})




export default Admin