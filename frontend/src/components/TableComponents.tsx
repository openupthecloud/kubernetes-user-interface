const TableComponent = ({ children }: { children: React.ReactNode }) => {
    return <table className="text-white w-full mb-4">
        {children}
    </table>
}

const TableHeaderComponent = ({ headers = [] }: { headers: String[] }) => {
    return <tr>
        {
            headers.map((header, index) => <th key={index} className="text-left font-light">{header}</th>)
        }
    </tr>
}

const TableRowComponent = ({ children, index }: { children: React.ReactNode, index: number }) => {
    return <tr key={index} className="border-2 border-slate-700">
        {children}
    </tr>
}

const TableCellComponent = ({ children, bold }: { children: React.ReactNode, bold?: boolean }) => {
    return <td className={`p-2 ${bold || 'text-bold'}`}>
        {children}
    </td>
}

export { TableComponent, TableHeaderComponent, TableRowComponent, TableCellComponent }