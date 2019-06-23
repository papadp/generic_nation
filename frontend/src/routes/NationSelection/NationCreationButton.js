import React from 'react'
import {Link} from "@reach/router"

export default ({}) => {
    return (
        <button className="nation-button nation-creation-button" >
            <Link to={"/setup/new"} >
                <h3 className="nation-name"> + Add Nation </h3>
            </Link>
        </button>
    )
}