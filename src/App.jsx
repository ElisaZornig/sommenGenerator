import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ChatForm from "./ChatForm.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ChatForm/>
    </>
  )
}

export default App
