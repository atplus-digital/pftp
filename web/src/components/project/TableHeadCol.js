function TableHeadCol({title, customClass, CustomSize}){

    const defaultClass = `${ CustomSize || "px-6 py-3" }  text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50`


    return(
            <th className={defaultClass} > {title} </th> 
    )


}

export default TableHeadCol