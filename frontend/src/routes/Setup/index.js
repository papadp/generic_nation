import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { navigate } from "@reach/router"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { COLUMN_TYPE } from '../../consts'
import { updateInArray } from '../../utils'
import ColumnEditor from './ColumnEditor'
import './Setup.scss'
import axios from "axios";

export default ({ nationId }) => {
    const isNewNation = nationId === 'new'
    const [nationName, setNationName] = useState('')
    const [selectedColumnIndex, setSelectedColumnIndex] = useState(0)
    const [columns, setColumns] = useState([])

    useEffect(() => {
        if (isNewNation) return
        try {
            const fetchData = async () => {
                const result = await axios(
                    `http://10.68.179.18:5000/api/nations/${nationId}`,
                )

                const nation = result.data
                setNationName(nation.name)
                setColumns(nation.columns)
            }
            fetchData()
        } catch (error) {
            console.error(error)
        }
    }, [])

    const save = async () => {
        const data = { name: nationName, columns }
        const payload = isNewNation ? {
            method: 'post',
            url: 'http://10.68.179.18:5000/api/nations',
            data,
            dataType: 'json',
        } : {
            method: 'put',
            url: `http://10.68.179.18:5000/api/nations/${nationId}`,
            data,
            dataType: 'json',
        }
        try {
            await axios(payload)
            navigate('/')
        } catch (error) {
            console.error(error)
        }
    }

    const updateColumn = (update) => {
        setColumns(updateInArray(columns, selectedColumnIndex, update))
    }

    const newColumn = () => {
        setColumns([
            ...columns,
            { name: 'New column',  type: COLUMN_TYPE.BOOL, price: 50 },
        ])
        setSelectedColumnIndex(_.size(columns))
    }

    return (
        <div id="setup" className="route">
            <div className="input-section">
                <h3>Nation Name</h3>
                <input type="text" value={nationName} onChange={e => setNationName(e.target.value)} />
            </div>
            <h3>Nation Columns</h3>
            <div className="columns-editor">
                <div className="columns-list">
                    {_.map(columns, (column, i) => (
                        <div key={`column-edit-${i}`}
                             className={classNames("column-item", i === selectedColumnIndex && 'selected')}
                             onClick={() => setSelectedColumnIndex(i)}>
                            { column.name }
                        </div>
                    ))}
                    <div className="column-item add-item" onClick={newColumn}>
                        <FontAwesomeIcon icon={faPlus} />Add Column
                    </div>
                </div>
                <div className="column-props">
                    {_.size(columns) > 0 && (
                        <ColumnEditor {...columns[selectedColumnIndex]} updateColumn={updateColumn} />
                    )}
                </div>
            </div>
            <div className="buttons">
                <button onClick={save}>Save Nation</button>
            </div>
        </div>
    )
}