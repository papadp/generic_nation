import React from 'react'
import {Link} from "@reach/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEyeDropper} from "@fortawesome/free-solid-svg-icons";

export default ({nation}) => {
    return (
        <button className="nation-button nation-selection-button">
            <Link className="nation-order-link" to={`/order/${nation.id}`}>
                <h2 className="nation-name"> {nation.name}  </h2>
            </Link>

            <div className="edit-nation-icon" title="Edit Nation">
                <Link to={`/setup/${nation.id}`}>
                    <FontAwesomeIcon icon={faEyeDropper}/>
                </Link>
            </div>

        </button>
    )
}