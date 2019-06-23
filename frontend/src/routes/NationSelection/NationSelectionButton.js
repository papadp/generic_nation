import React from 'react'

export default ({nation}) => {
    return (
        <div className="nation-button nation-selection-button">
            <h1 className="nation-name"> {nation.name}  </h1>

        </div>
    )
}