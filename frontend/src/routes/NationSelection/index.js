import React from 'react'
import NationSelectButton from './NationSelectionButton.js'
import NationCreationButton from './NationCreationButton.js'
import _ from 'lodash'
import "./NationSelection.css"

export default ({nations}) => {
    return (
        <div className="route nation-selection">
            <h1 className="title"> Nation Selection </h1>
            <div className="nations-list">
                {_.map(nations, nation =>
                    <NationSelectButton nation={nation} />
                )}
                <NationCreationButton/>
                <NationCreationButton/>
                <NationCreationButton/>
                <NationCreationButton/>
                <NationCreationButton/>
                <NationCreationButton/>
                <NationCreationButton/>
                <NationCreationButton/>
                <NationCreationButton/>
                <NationCreationButton/>
            </div>

        </div>
    )
}