import { GetQuotaUtilization, getAllFilesOnDir } from "../GetQuotaUtilization"

test('getAllFilesOnDir: Obtendo o tamanho de um diretório', async () => {
    let resultgetAllFilesOnDir = await getAllFilesOnDir('.')
    expect(typeof resultgetAllFilesOnDir ).toBe("object")
    expect(resultgetAllFilesOnDir).toBeDefined()
    expect(resultgetAllFilesOnDir).not.toBeNull()
})
// test('getUserDiskUsage: Obtendo o tamanho de um diretório', async () => {
//     let resultgetUserDiskUsage = getUserDiskUsage('.', 1)
//     expect(typeof resultgetUserDiskUsage ).toBe("object")
//     // expect(resultgetUserDiskUsage).toBeDefined()
//     // expect(resultgetUserDiskUsage).not.toBeNull()
//     // expect(resultgetUserDiskUsage).toMatch(/MB|GB|KB|TB/)
//     console.log(resultgetUserDiskUsage)
// })

test('GetQuotaUtilization: Deve obter o tamanho de armazenamento de um usuário FTP', async () => {
    const resultGetQuotaUtilization =  await GetQuotaUtilization('erico')
    expect(typeof resultGetQuotaUtilization).toBe("object")
    expect(typeof resultGetQuotaUtilization.DiskUsage).toBe("number")
    expect(typeof resultGetQuotaUtilization.totalfilesUsage).toBe("number")
    expect(resultGetQuotaUtilization).toBeDefined()
    expect(resultGetQuotaUtilization).not.toBeNull()
    console.log(resultGetQuotaUtilization)
})