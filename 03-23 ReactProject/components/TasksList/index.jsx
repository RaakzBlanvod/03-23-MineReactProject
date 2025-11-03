import TasksItem from "../TasksItem"

const TasksList = ({ tasks, removeTask, toggleTask, editTask }) => {
    return (
        <ul>
            {tasks.map(task => (
                <TasksItem
                    key={task.id}
                    task={task}
                    removeTask={removeTask}
                    toggleTask={toggleTask}
                    editTask={editTask}
                />
            ))}
        </ul>
    )
}

export default TasksList