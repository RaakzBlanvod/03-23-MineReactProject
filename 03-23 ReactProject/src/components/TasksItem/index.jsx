import { useState } from "react"

const TasksItem = ({ task, removeTask, toggleTask, editTask }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(task.text)

    const getDeadlineStatus = (deadline) => {
        if (!deadline) return ''
        
        const today = new Date()
        const deadlineDate = new Date(deadline)
        
        today.setHours(0, 0, 0, 0)
        deadlineDate.setHours(0, 0, 0, 0)
        
        const timeDiff = deadlineDate.getTime() - today.getTime()
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
        
        if (daysDiff < 0) return 'deadline-passed'
        if (daysDiff === 0) return 'deadline-today'
        if (daysDiff === 1) return 'deadline-tomorrow'
        if (daysDiff <= 3) return 'deadline-soon'
        
        return ''
    }

    const handleSave = () => {
        if (editText.trim()) {
            editTask(task.id, editText)
            setIsEditing(false)
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSave()
        }
    }

    const handleCancel = () => {
        setEditText(task.text)
        setIsEditing(false)
    }

    const deadlineStatus = getDeadlineStatus(task.deadline)

    return (
        <li className={`task-item ${task.completed ? 'completed' : ''}`}>
            <input 
                type="checkbox" 
                className="task-checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
            />
            
            <div className="task-content">
                {isEditing ? (
                    <div className="edit-container">
                        <input 
                            type="text"
                            className="task-edit-input"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            autoFocus
                        />
                    </div>
                ) : (
                    <span 
                        className={`task-text ${task.completed ? 'completed' : ''}`}
                        onDoubleClick={() => setIsEditing(true)}
                    >
                        {task.text}
                    </span>
                )}
                
                {task.deadline && (
                    <div className={`task-deadline ${deadlineStatus}`}>
                        📅 {new Date(task.deadline).toLocaleDateString()}
                        {deadlineStatus === 'deadline-today' && ' ⚠️ TODAY!'}
                        {deadlineStatus === 'deadline-tomorrow' && ' 🔥 Tomorrow'}
                        {deadlineStatus === 'deadline-soon' && ' ⏳ Soon'}
                        {deadlineStatus === 'deadline-passed' && ' ❌ Overdue'}
                    </div>
                )}
            </div>
            
            <div className="task-buttons">
                {isEditing ? (
                    <>
                        <button 
                            className="task-btn save-btn"
                            onClick={handleSave}
                        >
                            ✅ Save
                        </button>
                        <button 
                            className="task-btn cancel-btn"
                            onClick={handleCancel}
                        >
                            ❌ Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button 
                            className="task-btn delete-btn"
                            onClick={() => removeTask(task.id)}
                        >
                            🗑️ Delete
                        </button>
                        <button 
                            className="task-btn edit-btn"
                            onClick={() => setIsEditing(true)}
                        >
                            ✏️ Edit
                        </button>
                    </>
                )}
            </div>
        </li>
    )
}

export default TasksItem