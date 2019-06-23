import React from 'react'
import {Link, navigate} from "@reach/router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEyeDropper, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {faTrashRestore} from "@fortawesome/free-solid-svg-icons/faTrashRestore";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from "axios"; // Import css

export default ({nation}) => {
    const deleteNation = () => {
        confirmAlert({
      title: 'Confirm',
      message: 'Are you sure you want to delete?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
              const payload = {
                  method: 'delete',
                  url: `http://127.0.0.1:5000/api/nations/${nation.id}`
              }
              try {
                  await axios(payload)
                  navigate('/')
              } catch (error) {
                  console.error(error)
              }
          }
    },
        {
          label: 'No'
        }
      ]
    });
    }

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
            <div className="trash-nation-icon" title="Trash Your Nation">
                < button
                onClick={deleteNation}>
                    <FontAwesomeIcon icon={faTrashAlt}/>
                </button>

            </div>


        </button>



    )
}