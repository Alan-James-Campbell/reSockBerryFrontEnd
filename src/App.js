import React, { useState, useEffect } from 'react'
import socketIOClient from 'socket.io-client'
import axios from 'axios'
const ENDPOINT = 'http://127.0.0.1:4001'
const socket = socketIOClient(ENDPOINT)

const App = () => {
  const [ledStatus, setLedStatus ] = useState(false)
  
  useEffect(() => {
    socket
      .emit('LED-STATUS-CHECK', true)
      .on('LED-STATUS-UPDATE', bool => {
        setLedStatus(bool)
      })
  }, [])

  return (
    <div>
      <h1>{ledStatus === 'on' ? 'on' : 'off'}</h1>
      <button 
        onClick={e => {
          // axios.get('http://localhost:4001/api/led/test')
          // socket.emit('LED-STATUS-CHANGE', true)
          axios.post('api/led/status', {status: 'on'})
          .then(response => {
            console.log(response)
          })
          .catch(err => {
            console.log(err)
          })
        }}
      >
        turn on
      </button>
      <button 
        onClick={e => {
          // axios.post('http://localhost:4001/api/led/status', {status: 'off'})
          // socket.emit('LED-STATUS-CHANGE', false)
          axios.post('api/led/status', {status: 'off'})
          .then(response => {
            console.log(response)
          })
          .catch(err => {
            console.log(err)
          })
        }}
      >
        turn off
      </button>

    </div>
  )
}

export default App


