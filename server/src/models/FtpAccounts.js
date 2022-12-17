import { Sequelize, Model, DataTypes } from "sequelize"
import "dotenv/config"
import Database  from "../config/databaseConfig"

const FtpAccounts = Database.define("ftpd", {
    User: {
        type: DataTypes.STRING(30),
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    status: {
        type: DataTypes.ENUM("0","1"),
        // values: [0,1],
        defaultValue: '1',
        allowNull: false
    },
    Password: {
        type: DataTypes.STRING(64),
        allowNull: false
    },
    Uid: {
        type: DataTypes.STRING(11),
        allowNull: false,
        defaultValue: 'ftpuser',
    },
    Gid: {
        type: DataTypes.STRING(11),
        allowNull: false,
        defaultValue: 'ftpgroup',
    },
    Dir: {
        type: DataTypes.STRING(250),
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
        type: DataTypes.TEXT('tiny'),
        allowNull: true
    },
    ipaccess: {
        type: DataTypes.STRING(15),
        allowNull: false,
        defaultValue: '*',
    },
    QuotaSize: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        defaultValue: 0,
    },
    QuotaFiles: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        defaultValue: 0
    }
},
{
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: false,
    // freezeTableName:true,
    tableName: "ftpd"

})


export default FtpAccounts
