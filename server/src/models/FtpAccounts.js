import { Sequelize, Model, DataTypes } from "sequelize"
import "dotenv/config"
import Database  from "../config/databaseConfig"

const FtpAccounts = Database.define("ftpd", {
    User: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    status: {
        type: DataTypes.ENUM,
        values: [0,1],
        defaultValue: '1',
        allowNull: false
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Uid: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'ftpuser',
    },
    Gid: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'ftpgroup',
    },
    Dir: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '/ftpdata/public',
    },
    ULBandwidth: {
        type: DataTypes.SMALLINT(5),
        allowNull: false,
        defaultValue: 0,
    },
    DLBandwidth: {
        type: DataTypes.SMALLINT(5),
        allowNull: false,
        defaultValue: 0,
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    ipaccess: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '*',
    },
    QuotaSize: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 0,
    },
    QuotaFiles: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 0
    }
},
{
    timestamps: false,
    freezeTableName:true,
    tableName: "ftpd"

})


export default FtpAccounts
