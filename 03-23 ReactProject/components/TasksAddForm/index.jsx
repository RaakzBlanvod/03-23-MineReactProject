import { useState } from "react"

const TasksAddForm = ({ addTask }) => {
    const [userTask, setUserTask] = useState("")
    const [hasDeadline, setHasDeadline] = useState(false)
    const [deadline, setDeadline] = useState("")

    const submitForm = (e) => {
        e.preventDefault()
        if (userTask.trim()) {
            const taskData = {
                text: userTask.trim(),
                deadline: hasDeadline ? deadline : null
            }
            addTask(taskData)
            setUserTask("")
            setHasDeadline(false)
            setDeadline("")
        }
    }

    const handleInput = (e) => {
        setUserTask(e.target.value)
    }

    const handleDeadlineToggle = (e) => {
        setHasDeadline(e.target.checked)
        if (!e.target.checked) {
            setDeadline("")
        }
    }

    return (
        <form className="task-form" onSubmit={submitForm}>
            <input 
                className="form-input"
                value={userTask} 
                onChange={handleInput} 
                type="text" 
                placeholder="Введите задачу"
            />
            
            <div className="form-checkbox">
                <input 
                    type="checkbox" 
                    id="deadline" 
                    checked={hasDeadline}
                    onChange={handleDeadlineToggle}
                />
                <label htmlFor="deadline">
                    Add deadline
                </label>
            </div>
            
            {hasDeadline && (
                <input 
                    className="date-input"
                    type="date" 
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
            )}
            
            <button type="submit" className="submit-btn">
                Add Task
            </button>
        </form>
    )
}

export default TasksAddForm