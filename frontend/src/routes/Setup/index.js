import React, { useState } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { COLUMN_TYPE } from '../../consts'
import ColumnEditor from './ColumnEditor'
import './Setup.scss'

export default () => {
    const [nationName, setNationName] = useState('')
    const [selectedColumnIndex, setSelectedColumnIndex] = useState(0)
    const [columns, setColumns] = useState([
        { type: COLUMN_TYPE.BOOL, price: 50, name: 'Main Hamin' },
        { type: COLUMN_TYPE.INT, price: 10, name: 'Side Hamin' },
        { type: COLUMN_TYPE.MULTI, name: 'Last Hamin', options: [
                { name: 'Of', price: 42 },
                { name: 'Shnitzel', price: 44 },
        ] },
    ])

    const save = () => {

    }

    const updateColumn = (update) => {
        setColumns(_.map(columns, function(a, i) {
          return i === selectedColumnIndex ? {...a, ...update} : a;
        }))
    }

    return (
        <div id="setup" className="route">
            <div className="input-section">
                <label>Nation Name</label>
                <input type="text" value={nationName} onChange={e => setNationName(e.target.value)} />
            </div>
            <div className="columns-editor">
                <div className="columns-list">
                    {_.map(columns, (column, i) => (
                        <div key={`column-edit-${i}`}
                             className={classNames("column-item", i === selectedColumnIndex && 'selected')}
                             onClick={() => setSelectedColumnIndex(i)}>
                            { column.name }
                        </div>
                    ))}
                </div>
                <div className="column-props">
                    <ColumnEditor {...columns[selectedColumnIndex]} updateColumn={updateColumn} />
                </div>
            </div>
            <div className="buttons">
                <button onClick={save}>Save Nation</button>
            </div>
        </div>
    )
}