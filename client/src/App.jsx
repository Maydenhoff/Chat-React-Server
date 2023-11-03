import { useEffect, useState } from "react"
import io from "socket.io-client"

const socket = io("http://localhost:3000") //comunico el back

function App() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  
  const handleSubmit = (event) => {
    event.preventDefault()
    const newMessage = {
      body: message,
      from: "Me"
    }
    
    setMessage("")
    
    setMessages((prevValuee) => {
      return [...prevValuee, newMessage]
    })
    // setMessages([...messages, message])
    socket.emit("message", message)
  }
  
  useEffect(()=> {
    socket.on("message", receiveMessage)
    
    return () => {
      socket.off("message", receiveMessage)
    }
  }, [])
  
  
  const receiveMessage = (message) => {
    console.log("estoy recibiendo", message);
    return setMessages((state) => [...state, message])
  }
  return (
    <div className="h-screen bg-zinc-800 text-white flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-10">
        <h1 className="text-2xl font-bold my-2">ChaT React</h1>
        <input type="text" placeholder="Write your message..." value={message} onChange={(event) => setMessage(event.target.value)} className="border-2 border-zinc-500 p-2 w-full text-black" ></input>
        {/* <button>Send</button> */}
      <ul>
       
    {
      messages.map((message, i) => (
      <li key={i} className={
        `my-2 p-2 tanble  rounded-md  ${message.from === "Me" ?"bg-sky-700 " : "bg-black ml-auto" }`
      }><span className="text-xs test-slate-300 block">{message.from}</span>: <span className="text-md">{message.body } </span></li>
      ))
    }

      </ul>
      </form>

    </div>
  )
}

export default App