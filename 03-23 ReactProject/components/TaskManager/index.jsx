import { useState } from "react"
import TasksList from "../TasksList"
import TasksAddForm from "../TasksAddForm"

const TasksManager = () => {
    const [tasks, setTasks] = useState([
        { id: 1, text: "Feed my dog", completed: false, deadline: null },
        { id: 2, text: "Make dinner", completed: false, deadline: null }
    ])

    const addTask = (taskData) => {
        const newTask = {
            id: Date.now(),
            text: taskData.text,
            completed: false,
            deadline: taskData.deadline || null
        }
        setTasks([...tasks, newTask])
    }

    const removeTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId))
    }

    const toggleTask = (taskId) => {
        setTasks(tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ))
    }

    const editTask = (taskId, newText) => {
        if (newText.trim()) {
            setTasks(tasks.map(task => 
                task.id === taskId ? { ...task, text: newText.trim() } : task
            ))
        }
    }

    return (
        <div className="tasks-manager">
            <TasksAddForm addTask={addTask} />
            <TasksList 
                tasks={tasks}
                removeTask={removeTask}
                toggleTask={toggleTask}
                editTask={editTask}
            />
        </div>
    )
}

export default TasksManager