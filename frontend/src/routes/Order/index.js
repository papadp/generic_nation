import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import axios from "axios"
import ReactTable from 'react-table'
import { updateInArray } from '../../utils'
import 'react-table/react-table.css'
import './Order.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {COLUMN_TYPE} from "../../consts";


export default ({ nationId }) => {

    const [nation, setNation] = useState(null)
    const [rows, setRows] = useState([])
    const [focusedCellId, setFocusedCellId] = useState('')

    const updateCell = (rowIndex, columnName, value) => {
        setRows(
            updateInArray(rows, rowIndex, { [columnName]: value })
        )
    }

    const updateCellValue = (row, rowIndex, columnIndex, value) => {
        const values = row._original.values
        values[columnIndex] = value
        setRows(
            updateInArray(rows, rowIndex, { values })
        )
    }

    const columnIndexByName = columnName => {
        return _.findIndex(nation.columns, col => col.name === columnName)
    }

    const renderCell = (info) => {
        const { column, value, index, row } = info
        const { id: columnName, type } = column
        const cellId = `${columnName}-${index}`
        if (columnName === 'user') {
            return (
                <input type={columnName === 'user' ? "text" : "number"} value={value}
                       id={cellId}
                       autoFocus={cellId === focusedCellId}
                       onFocus={() => setFocusedCellId(cellId)}
                       onChange={e => updateCell(index, columnName, e.target.value)} />
            )
        }
        if (type === COLUMN_TYPE.INT) {
            return (
                <input type="number" value={value}
                       id={cellId}
                       autoFocus={cellId === focusedCellId}
                       onFocus={() => setFocusedCellId(cellId)}
                       onChange={e => updateCellValue(row, index, columnIndexByName(columnName), e.target.value)} />
            )
        }
        if (type === COLUMN_TYPE.BOOL) {
            return (
                <input type="checkbox" checked={value}
                       id={cellId}
                       onChange={e => updateCellValue(row, index, columnIndexByName(columnName), e.target.checked)} />
            )
        }
        if (type === COLUMN_TYPE.MULTI) {
            return (
                <select value={value} onChange={e => updateCellValue(row, index, columnIndexByName(columnName), e.target.value)}>
                    {_.map(column.options, (option, i) => (
                        <option key={`row-${index}-option-${i}`} value={option.name}>{option.name}</option>
                    ))}
                </select>
            )
        }
    }

    const getColumns = (colDefs) => ([
        { Header: 'Name', accessor: 'user', Cell: renderCell },
        ..._.map(colDefs, (col, i) => ({ ...col, Header: col.name, accessor: col.name, Cell: renderCell })),
    ])

    const getEmptyRow = (columns) => {
        return {
            user: '',
            values: _.map(columns, () => '')
        }
    }

    useEffect(() => {
        try {
            const fetchData = async () => {
                const result = await axios(
                    `http://127.0.0.1:5000/api/order/${nationId}`,
                )
                const { nation, rows } = result.data
                setNation(nation)
                setRows(!_.isEmpty(rows) ? rows : [getEmptyRow(nation.columns)])
            }
            fetchData()
        } catch (error) {
            console.error(error)
        }
    }, [])
    
    if (_.isNil(nation)) return null

    const columns = getColumns(nation.columns)

    const newRow = () => {
        const colsWithoutUser = _.takeRight(columns, _.size(columns) - 2)
        setRows([
            ...rows,
            getEmptyRow(colsWithoutUser),
        ])
    }


    const processedRows = _.map(rows, row => {
        const { values = [] } = row
        const colsWithoutUser = _.takeRight(columns, _.size(columns) - 1)
        const processedValues = _.map(colsWithoutUser, (col, i) => _.size(values) > i ? values[i] : '')
        return {
            ...row,
            values: processedValues,
            ..._.zipObject(
                _.map(colsWithoutUser, 'accessor'),
                processedValues
            ),
        }
    })

    return (
        <div className="route">
            {_.size(rows)} Rows
            <ReactTable data={processedRows}
                        columns={columns} showPagination={false} minRows={0} />
            <div className="column-item add-item" onClick={newRow}>
                <FontAwesomeIcon icon={faPlus} />Add Row
            </div>
        </div>
    )
}