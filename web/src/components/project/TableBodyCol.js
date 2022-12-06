
function  TableBodyCol(props){

    const defaultClass = "px-6 py-4 border-b border-gray-200 whitespace-nowrap" 

    return(<td className={ props.customClass || defaultClass}> {props.children}</td>)
}

export default TableBodyCol
