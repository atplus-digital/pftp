import {existsSync, readdirSync, statSync} from "fs"
import path from "path"
import {promisify} from "util"
import {RootFtpDataDir} from "../../../config/RootFtpDataDir"
import fastFolderSize from "fast-folder-size"
const fastFolderSizeAsync = promisify(fastFolderSize)

const getAllFilesOnDir = (dirPath, arrayOfFiles) => {

    let files = readdirSync(dirPath)
  
    arrayOfFiles = arrayOfFiles || []
  
    files.forEach((file) => {
      if (statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllFilesOnDir(dirPath + "/" + file, arrayOfFiles)
      } else {
        arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
      }
    })
  
    return arrayOfFiles
  }


const GetQuotaUtilization =  (UserFTPAccount) => {
    return new Promise( async (resolve, reject) => {

        try {

            const PathDataDirUser = `${RootFtpDataDir}/${UserFTPAccount}`
        
            if( !existsSync(PathDataDirUser))(resolve({ DiskUsage: 0, totalfilesUsage: 0 }))

            const UserSizeDir = await fastFolderSizeAsync(PathDataDirUser)

            const AllFilesOnDir = getAllFilesOnDir(PathDataDirUser)

            resolve({ DiskUsage: UserSizeDir, totalfilesUsage: AllFilesOnDir.length } )
    
        } catch (error) {
            reject(error)
        }
    })
}

export  {GetQuotaUtilization,  getAllFilesOnDir }