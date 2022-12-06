

const ConvertSizeDisk = (Bytes, NumberDecimal) => {
    if(!+Bytes) return("0 MB")

    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const NumberOfBytesToKB = 1024

    const IndexSizeArray = Math.floor(Math.log(Bytes) / Math.log(NumberOfBytesToKB))

    return(`${parseFloat((Bytes / Math.pow(NumberOfBytesToKB, IndexSizeArray)).toFixed(NumberDecimal))}${sizes[IndexSizeArray]}`)
}

export default ConvertSizeDisk