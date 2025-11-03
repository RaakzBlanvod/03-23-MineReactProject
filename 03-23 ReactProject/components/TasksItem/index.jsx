import { useState } from "react"

const TasksItem = ({ task, removeTask, toggleTask, editTask }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(task.text)

    const isDeadlinePassed = (deadline) => {
        if (!deadline) return false
        const today = new Date()
        const deadlineDate = new Date(deadline)
        today.setHours(0, 0, 0, 0)
        deadlineDate.setHours(0, 0, 0, 0)
        return deadlineDate < today
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

    return (
        <li className={`task-item ${task.completed ? 'completed' : ''}`}>
            <input 
                type="checkbox" 
                className="task-checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
            />
            
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {isEditing ? (
                    <input 
                        type="text"
                        className="task-edit-input"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onBlur={handleSave}
                        onKeyPress={handleKeyPress}
                        autoFocus
                    />
                ) : (
                    <span 
                        className={`task-text ${task.completed ? 'completed' : ''}`}
                        onDoubleClick={() => setIsEditing(true)}
                    >
                        {task.text}
                    </span>
                )}
                
                {task.deadline && (
                    <div className={`task-deadline ${isDeadlinePassed(task.deadline) ? 'deadline-passed' : ''}`}>
                        📅 Deadline: {new Date(task.deadline).toLocaleDateString()}
                        {isDeadlinePassed(task.deadline) && ' ⚠️'}
                    </div>
                )}
            </div>
            
            <div className="task-buttons">
                <button 
                    className="task-btn delete-btn"
                    onClick={() => removeTask(task.id)}
                >
                    Delete
                </button>
                <button 
                    className={`task-btn ${isEditing ? 'cancel-btn' : 'edit-btn'}`}
                    onClick={isEditing ? handleCancel : () => setIsEditing(true)}
                >
                    {isEditing ? 'Cancel' : 'Edit'}
                </button>
            </div>
        </li>
    )
}

export default TasksItem