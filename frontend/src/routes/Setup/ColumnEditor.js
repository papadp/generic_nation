import React, { Fragment } from 'react'
import _ from 'lodash'
import { COLUMN_TYPE } from '../../consts'
import { updateInArray } from '../../utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'


export default ({ name, type, price, options=[], updateColumn }) => {

    const updateOption = (propName, index) => e => {
        updateColumn({
            options: updateInArray(options, index, { [propName]: e.target.value })
        })
    }

    const newOption = () => {
        updateColumn({
            options: [
                ...options,
                { name: '',  price: 50 },
            ]
        })
    }

    return (
        <Fragment>
            <div className="input-section">
                <label>Column Name</label>
                <input type="text" value={name} onChange={e => updateColumn({name: e.target.value})} />
            </div>
            <div className="input-section">
                <label>Column Type</label>
                <select value={type} onChange={e => updateColumn({type: e.target.value})}>
                    <option value={COLUMN_TYPE.BOOL}>Yes / No</option>
                    <option value={COLUMN_TYPE.INT}>Number</option>
                    <option value={COLUMN_TYPE.MULTI}>Multiple options</option>
                </select>
            </div>
            {type === COLUMN_TYPE.MULTI ? (
                <div className="input-section">
                    <div className="col-option">
                        <div style={{width: '50%'}}>Name</div>
                        <div style={{width: '50%'}}>Price</div>
                    </div>
                    {_.map(options, (option, i) => (
                        <div key={`column-option-^${i}`} className="col-option">
                            <input type="text" value={option.name}
                                   onChange={updateOption('name', i)} />
                           <input type="text" value={option.price}
                                   onChange={updateOption('price', i)} />
                        </div>
                    ))}
                    <div className="add-item" onClick={newOption}>
                        <FontAwesomeIcon icon={faPlus} />Add Option
                    </div>
                </div>
            ) : (
                <div className="input-section">
                    <label>Price</label>
                    <input type="number" value={price} onChange={e => updateColumn({ price: e.target.value })} />
                </div>
            )}
        </Fragment>
    )
}