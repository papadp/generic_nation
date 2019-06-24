import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import axios from 'axios'
import './Output.scss'
import { confirmAlert } from 'react-confirm-alert'
import { COLUMN_TYPE } from '../../consts'

export default ({ nationId }) => {
  const [nation, setNation] = useState({ name: 'Loading' })
  const [output, setOutput] = useState({})

  let outputText = 'Please order for each user:\n'
  _.map(output.rows, row => {
    if (row.active) {
      outputText += _.join(row.values)
      outputText += ' for ' + row.user
      outputText += ' in price of ₪' + row.price + '\n'
    }
  })

  outputText += '\n\nThe order in total is:\n'
  _.map(output.columns, col => {
    if (col.type === COLUMN_TYPE.MULTI) {
      _.map(col, (value, key) => {
        if (key !== 'name' && key !== 'type') {
          outputText += value['amount'] + ' ' + key
          outputText += ' in price of ₪' + value['price'] + '\n'
        }
      })
    } else {
      outputText += col['amount'] + ' ' + col['name']
      outputText += ' in price of ₪' + col['price'] + '\n'
    }

  })

  const sendSlack = () => {
    confirmAlert({
      title: 'Confirm',
      message: 'Send the nation output to Slack channel #genericnation_msgs ?',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            const payload = {
              method: 'post',
              url: `http://10.68.179.18:5000/api/slack/msg`,
              data: { msg: outputText },
              dataType: 'json',
            }
            try {
              await axios(payload)
            } catch (error) {
              console.error(error)
            }
          },
        },
        {
          label: 'No',
        },
      ],
    })
  }

  useEffect(() => {
    try {
      const fetchOutput = async () => {
        const result = await axios(
          `http://10.68.179.18:5000/api/output/${nationId}`,
        )

        setOutput(result.data)
      }
      const fetchNation = async () => {
        const result = await axios(
          `http://10.68.179.18:5000/api/nations/${nationId}`,
        )

        setNation(result.data)
      }
      fetchOutput()
      fetchNation()
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <div className="output route">
      <h1>{nation.name} - Output</h1>
      {output.rows && <div className="output-body">
        <textarea className="text-output">{outputText}</textarea>
        <CopyToClipboard text={outputText}>
          <button className="copy-clipboard">Copy to clipboard</button>
        </CopyToClipboard>
        <button className="send-slack" onClick={sendSlack}>Send to slack</button>
      </div>}
    </div>
  )
}