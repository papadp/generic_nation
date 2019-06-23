import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import axios from "axios"
import ReactTable from 'react-table'
import { updateInArray } from '../../utils'
import 'react-table/react-table.css'
import './Order.scss'


export default ({ nationId }) => {

    const [nation, setNation] = useState(null)
    const [rows, setRows] = useState([])
    const [focusedCellId, setFocusedCellId] = useState('')

    const updateCell = (rowIndex, columnName, value) => {
        setRows(
            updateInArray(rows, rowIndex, { [columnName]: value })
        )
    }

    const renderCell = (info) => {
        const { column, value, index } = info
        const cellId = `${column.id}-${index}`
        return (
            <div>
                <input type="text" value={value}
                       id={cellId}
                       autoFocus={cellId === focusedCellId}
                       onFocus={() => setFocusedCellId(cellId)}
                       onChange={e => updateCell(index, column.id, e.target.value)} />
            </div>
        )
    }

    const getColumns = (colDefs) => ([
        { Header: 'Name', accessor: 'user', Cell: renderCell },
        ..._.map(colDefs, (col, i) => ({ Header: col.name, accessor: col.name, Cell: renderCell })),
    ])

    const getEmptyRow = (columns) => _.zipObject(
        _.map(columns, 'accessor'),
        _.map(columns, () => '')
    )

    useEffect(() => {
        try {
            const fetchData = async () => {
                const result = await axios(
                    `http://127.0.0.1:5000/api/order/${nationId}`,
                )
                const { nation, rows } = result.data
                setNation(nation)
                setRows(!_.isEmpty(rows) ? rows : [getEmptyRow(getColumns(nation.columns))])
            }
            fetchData()
        } catch (error) {
            console.error(error)
        }
    }, [])

    if (_.isNil(nation)) return null

    const columns = getColumns(nation.columns)

    return (
        <div className="route">
            {_.size(rows)} Rows
            <ReactTable data={rows}
                        columns={columns} showPagination={false} minRows={0} />
        </div>
    )
}