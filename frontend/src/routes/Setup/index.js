import React, { useState } from 'react'
import _ from 'lodash'
import { COLUMN_TYPE } from '../../consts'
/** @jsx jsx */
import { jsx } from '@emotion/core'
import ColumnEditor from './ColumnEditor'

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

    const updateColumn = (update) => {
        setColumns(_.map(columns, function(a, i) {
          return i === selectedColumnIndex ? {...a, ...update} : a;
        }))
    }

    return (
        <div id="setup" className="route">
            <div className="input-section">
                <input type="text" value={nationName} onChange={e => setNationName(e.target.value)} />
            </div>
            <div css={{
                display: 'flex',
            }}>
                <div css={{ width: 300 }}>
                    {_.map(columns, (column, i) => {
                        const css = { cursor: 'pointer' }
                        if (i === selectedColumnIndex) {
                            css.backgroundColor = 'pink'
                        }
                        return (
                            <div key={`column-edit-${i}`}
                                 onClick={() => setSelectedColumnIndex(i)}
                                 css={css} >
                                { column.name }
                            </div>
                        )
                    })}
                </div>
                <div css={{ flexGrow: 2 }}>
                    <ColumnEditor {...columns[selectedColumnIndex]} updateColumn={updateColumn} />
                </div>
            </div>
        </div>
    )
}