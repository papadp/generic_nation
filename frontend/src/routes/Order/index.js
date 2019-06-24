import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import axios from "axios"
import classNames from 'classnames'
import ReactTable from 'react-table'
import { updateInArray } from '../../utils'
import 'react-table/react-table.css'
import './Order.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {COLUMN_TYPE} from "../../consts";
import { useInterval } from '../../hooks'
import { Link } from '@reach/router'


export default ({ nationId, currentUser }) => {

    const [nation, setNation] = useState(null)
    const [rows, setRows] = useState([])
    const [focusedCellId, setFocusedCellId] = useState('')
    const [messages, setMessages] = useState([])

    const save = async (newRows) => {
        try {
            await axios({
                method: 'put',
                url: `http://10.68.179.18:5000/api/order/${nationId}`,
                data: { rows: newRows },
                dataType: 'json',
            })
        } catch (error) {
            console.error(error)
        }
    }

    const updateCell = (rowIndex, columnName, value) => {
        const newRows = updateInArray(rows, rowIndex, { [columnName]: value })
        setRows(newRows)
        save(newRows)
    }

    const updateCellValue = (row, rowIndex, columnIndex, value) => {
        const values = row._original.values
        values[columnIndex] = value
        const newRows = updateInArray(rows, rowIndex, { values })
        setRows(newRows)
        save(newRows)
    }

    const columnIndexByName = columnName => {
        return _.findIndex(nation.columns, col => col.name === columnName)
    }

    const renderCellContent = (info) => {
        const { column, value, index, row } = info
        const { id: columnName, type } = column
        const cellId = `${columnName}-${index}`
        if (columnName === 'user') {
            return (
                <input type="text" value={value}
                       id={cellId}
                       autoFocus={cellId === focusedCellId}
                       onFocus={() => setFocusedCellId(cellId)}
                       onChange={e => updateCell(index, columnName, e.target.value)} />
            )
        }
        if (columnName === 'active') {
            return (
                <input type="checkbox" checked={value}
                       id={cellId}
                       onChange={e => updateCell(index, columnName, e.target.checked)} />
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

    const renderCell = (info) => {
        const { column, value, index, row } = info
        const { id: columnName, type } = column
        const cellId = `${columnName}-${index}`

        const isCellDisabled = !row.active && columnName !== 'active'
        return (
            <div className={classNames("cell")}>
                {isCellDisabled && (<div className="cover" />)}
                {renderCellContent(info)}
            </div>
        )

        if (columnName === 'user') {
            return (
                <input type="text" value={value}
                       id={cellId}
                       autoFocus={cellId === focusedCellId}
                       onFocus={() => setFocusedCellId(cellId)}
                       onChange={e => updateCell(index, columnName, e.target.value)} />
            )
        }
        if (columnName === 'active') {
            return (
                <input type="checkbox" checked={value}
                       id={cellId}
                       onChange={e => updateCell(index, columnName, e.target.checked)} />
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
        { Header: '', accessor: 'active', Cell: renderCell, width: 50 },
        { Header: 'Name', accessor: 'user', Cell: renderCell },
        ..._.map(colDefs, (col, i) => ({ ...col, Header: col.name, accessor: col.name, Cell: renderCell })),
    ])

    const getEmptyRow = (columns) => {
        return {
            active: true,
            user: '',
            values: _.map(columns, () => '')
        }
    }

    const fetchRows = () => {
        try {
            const fetchData = async () => {
                const result = await axios(
                    `http://10.68.179.18:5000/api/order/${nationId}`,
                )
                const { nation, rows, chat } = result.data
                setNation(nation)
                setMessages(chat)
                // setMessages([
                //     {user: 'Asaf', message: '121425'},
                //     {user: 'Asaf', message: '121425sdfsdf'},
                //     {user: 'Dima', message: 'fksdkljfds'},
                // ])
                setRows(!_.isEmpty(rows) ? rows : [getEmptyRow(nation.columns)])
            }
            fetchData()
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(fetchRows, [])

    useInterval(fetchRows, 3000)

    if (_.isNil(nation)) return null

    const columns = getColumns(nation.columns)

    const newRow = () => {
        const colsWithoutUser = _.takeRight(columns, _.size(columns) - 2)
        const newRows = [
            ...rows,
            getEmptyRow(colsWithoutUser),
        ]
        setRows(newRows)
        save(newRows)
    }


    const processedRows = _.map(rows, row => {
        const { values = [] } = row
        const colsWithoutUser = _.takeRight(columns, _.size(columns) - 2)
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
        <div className="route order-page">
            <div className="order-view">
                <div className="chat">
                    <div className="messages">
                        {_.map(messages, ({user, message}, i) => (
                            <div key={`message-${i}`} className={classNames("message", user === currentUser && 'mine')}>
                                <b>{user}: </b>{message}
                            </div>
                        ))}
                    </div>
                    <div className="chat-input">
                        <input type="text" />
                    </div>

                </div>
                <div className="order-table">
                    <h2>{nation.name}</h2>
                    <ReactTable data={processedRows}
                                columns={columns} showPagination={false} minRows={0} />
                    <div className="column-item add-item" onClick={newRow}>
                        <FontAwesomeIcon icon={faPlus} />Add Row
                    </div>
                    <Link className="output-link"  to={`/output/${nation.id}`}>
                        Nation Output
                    </Link>
                </div>
            </div>
        </div>
    )
}