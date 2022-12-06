const System = require('systeminformation');
import serverLogError from "../../logs/serverLogError"
import { RootFtpDataDir } from "../../config/RootFtpDataDir";

export default async (req, res) => {
    try {

        let ConvertGB = 1073741824
        
        const FtpDataDirUsage = await System.fsSize()


        const { size:storageTotal, used:storageUsage, available:storageFree } = FtpDataDirUsage.find(disk => disk.mount === RootFtpDataDir ) 

        
        res.send({
            DiskTotal: Number((storageTotal / ConvertGB ).toFixed(1)),
            DiskUsage: Number((storageUsage / ConvertGB ).toFixed(1)),
            DiskAvailable: Number((storageFree / ConvertGB ).toFixed(1))
        })
    } catch (error) {
        serverLogError(error)
    }
}