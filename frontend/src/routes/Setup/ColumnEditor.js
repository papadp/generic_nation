import React, { Fragment } from 'react'
import { COLUMN_TYPE } from '../../consts'
/** @jsx jsx */
import { jsx } from '@emotion/core'

export default ({ name, type, price, options, updateColumn }) => {
    return (
        <Fragment>
            <div className="input-container">
                <input type="text" value={name} onChange={e => {
                    debugger
                    updateColumn({name: e.target.value})
                }} />
            </div>
            <div className="input-container">
                <select value={type} onChange={e => updateColumn({type: e.target.value})}>
                    <option value={COLUMN_TYPE.BOOL}>Yes/No</option>
                    <option value={COLUMN_TYPE.INT}>Number</option>
                    <option value={COLUMN_TYPE.MULTI}>Multiple options</option>
                </select>
                {type === COLUMN_TYPE.MULTI ? (
                    <div>Multi options</div>
                ) : (
                    <div className="input=container">
                        <input type="number" value={price} onChange={e => updateColumn({ price: e.target.value })} />
                    </div>
                )}
            </div>
        </Fragment>
    )
}