

const DiskUsedPercent = ( DiskUsageUnit ,QuotaSize) => {

    if(!+QuotaSize)return(0)

    const DiskUsedPercentage =  DiskUsageUnit / (QuotaSize * 1073741824) * 100

    return( DiskUsedPercentage.toFixed(0) >= 100 ? (100) : DiskUsedPercentage.toFixed(0) )
}


export default DiskUsedPercent
