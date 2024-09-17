import { Component, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Button } from 'primereact/button'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hello</h1>
      <div className='card flex justify-content-center'>
        <Button label='Submit'/>
      </div>
    </>
  )
}

export default App
