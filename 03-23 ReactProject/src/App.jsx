import { useState } from 'react'
import './App.css'
import TasksManager from './components/TaskManager'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

      <div className="tasks-section">
        <TasksManager />
      </div>
    </>
  )
}

export default App
