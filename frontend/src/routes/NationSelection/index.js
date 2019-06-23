import React, {useState, useEffect} from 'react';
import axios from 'axios';
import NationSelectButton from './NationSelectionButton.js'
import NationCreationButton from './NationCreationButton.js'
import _ from 'lodash'

import "./NationSelection.css"

export default () => {
    const [nations, setNations] = useState([]);

    useEffect(() => {
        try {
            const fetchData = async () => {
                const result = await axios(
                    'http://127.0.0.1:5000/api/nations',
                );

                setNations(result.data);
            };

            fetchData();

        } catch (error) {
            console.error(error)
        }
    }, []);

    return (
        <div className="route nation-selection">
            <h1 className="title"> Nation Selection </h1>
            <div className="nations-list">
                {_.map(nations, (nation, index) =>
                    <NationSelectButton key={index} nation={nation}/>
                )}
                <NationCreationButton/>

            </div>

        </div>
    )
}