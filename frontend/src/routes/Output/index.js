import React, { useState, useEffect } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import axios from 'axios'
import './Output.scss'

export default ({ nationId }) => {
  const [setOutput, output] = useState(null)

  useEffect(() => {
    try {
      const fetchData = async () => {
        const result = await axios(
          `http://127.0.0.1:5000/api/output/${nationId}`,
        )

        setOutput(result.data)
      }
      fetchData()
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <div className="output route">
      <textarea className="text-output">{output}</textarea>
      <CopyToClipboard text={'some text'}>
        <button className="copy-clipboard">Copy to clipboard</button>
      </CopyToClipboard>
    </div>
  )
}