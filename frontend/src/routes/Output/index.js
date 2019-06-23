import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import axios from 'axios'
import './Output.scss'

export default ({ nationId }) => {
  const [nation, setNation] = useState({ name: 'Loading' })
  const [output, setOutput] = useState({})

  useEffect(() => {
    try {
      const fetchOutput = async () => {
        const result = await axios(
          `http://127.0.0.1:5000/api/output/${nationId}`,
        )

        setOutput(result.data)
      }
      const fetchNation = async () => {
        const result = await axios(
          `http://127.0.0.1:5000/api/nations/${nationId}`,
        )

        setNation(result.data)
      }
      fetchOutput()
      fetchNation()
    } catch (error) {
      console.error(error)
    }
  }, [])

  let outputText = 'Please order for each user:\n'
  _.map(output.rows, row => {
    if (row.active) {
      outputText += _.join(row.values)
      outputText += ' for ' + row.user
      outputText += ' in price of ' + row.price + '\n'
    }
  })

  outputText += '\n\nThe order in total is:\n'
  _.map(output.columns, col => {
    _.map(col, (value, key) => {
      outputText += value['amount'] + ' ' + key
      outputText += ' in price of ' + value['price'] + '\n'
    })

  })

  return (
    <div className="output route">
      <h1>{nation.name} - Output</h1>
      {output.rows && <div className="output-body">
        <textarea className="text-output">{outputText}</textarea>
        <CopyToClipboard text={outputText}>
          <button className="copy-clipboard">Copy to clipboard</button>
        </CopyToClipboard>
      </div>}
    </div>
  )
}