import React, { useState, useContext } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { COLUMN_TYPE } from '../../consts'


export default () => {
    const [nationName, setNationName] = useState('')
    const [selectedColumnIndex, setSelectedColumnIndex] = useState(0)
    const columns = [
        { type: COLUMN_TYPE.BOOL, price: 50, name: 'Main Hamin' },
        { type: COLUMN_TYPE.INT, price: 10, name: 'Side Hamin' },
        { type: COLUMN_TYPE.MULTI, name: 'Last Hamin', options: [
                { name: 'Of', price: 42 },
                { name: 'Shnitzel', price: 44 },
        ] },
    ]
    return (
        <div id="setup" className="route">
            <div className="input-section">
                <input type="text" value={nationName} onChange={e => setNationName(e.target.value)} />
            </div>
            <div className="input-section">
                {_.map(columns, (column, i) => {
                    return (
                        <div key={`column-edit-${i}`} className={classNames("setup-column", selectedColumnIndex === i && "selected")}>
                            { column.name }
                        </div>
                    )
                })}

            </div>
        </div>
    )
}