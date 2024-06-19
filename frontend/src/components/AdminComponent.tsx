
import { useState, useEffect } from 'react';
import { dataServiceInstance } from '../services/DataService'
import { format } from 'date-fns'

import { TableComponent, TableHeaderComponent, TableRowComponent, TableCellComponent } from '../components/TableComponents'
import { HeaderComponent } from '../components/HeaderComponent'
import { EmptyComponent } from '../components/EmptyComponent'

import { Node } from '../services/DataService'

const AdminComponent = () => {
    const [nodes, setNodes] = useState<Node[]>([]);

    useEffect(() => {
        dataServiceInstance
            .getNodes()
            .then(setNodes)
    }, [nodes])

    return <><HeaderComponent
        text="Nodes"
        icon="Square2StackIcon"
        refresh={() => { dataServiceInstance.getNodes().then(setNodes) }}
        count={nodes.length}
    />
        <EmptyComponent condition={() => nodes.length > 0}><TableComponent>
            <TableHeaderComponent headers={[
                "created",
                "capacity - pods",
                "capacity - cpu",
            ]} />
            <tbody>
                {
                    nodes.map((node, index) => {
                        return <TableRowComponent index={index}>

                            <TableCellComponent bold>
                                <p>{format(node.timestamp, 'p - PPP')}</p>
                            </TableCellComponent>
                            <TableCellComponent bold> {node.capacity.cpu} </TableCellComponent>
                            <TableCellComponent bold> {node.capacity.pods} </TableCellComponent>
                        </TableRowComponent>
                    })
                }
            </tbody>
        </TableComponent>
        </EmptyComponent>
    </>
}

export { AdminComponent }