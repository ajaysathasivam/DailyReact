
import { Card, CardHeader, CardTitle, CardContent } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { DataTable } from "./columns"
import { useState } from "react"

const columns = [
    {
        accessorKey: "title",
        header: "Title",
        cell: info => info.getValue(),
    },
    {
        accessorKey: "priority",
        header: "Priority",
        cell: info => info.getValue(),
    },
]


const TaskPriorityCard = ({ count = 0, status = '', children }) => {

    const colors = status.toLocaleLowerCase() === 'high' ? 'text-red-500 bg-red-100' :
        status.toLocaleLowerCase() === 'medium' ? "text-orange-500 bg-orange-100" :
            status.toLocaleLowerCase() === 'low' ? "text-green-500 bg-green-100" : ''


    return (
        <Card className="bg-white/30 backdrop-blur-md border border-white/20 shadow-md rounded-2xl p-4">
            <CardHeader className="p-0 pb-2 text-center">
                <CardTitle className="text-lg font-semibold text-gray-800">
                    {status} Priority
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-3">
                <div className={`flex justify-center items-center w-14 h-14 rounded-full   font-bold text-xl shadow-inner ${colors}`}>
                    {count}
                </div>
                <p className="text-sm text-gray-700 font-medium tracking-wide">
                    {children}
                </p>

            </CardContent>
        </Card>
    )
}

export default function TaskDashboard() {
    const [task, setTask] = useState({ title: '', priority: 'high' })
    const [tasks, setTasks] = useState([])
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!(task?.title && task?.priority)) return

        setTasks(pre => [...pre, task])
        setTask({ title: '', priority: 'high' })
    }
    const highPriority = tasks?.filter((obj) => obj.priority === 'high').length
    const lowPriority = tasks?.filter((obj) => obj.priority === 'low').length
    const mediumPriority = tasks?.filter((obj) => obj.priority === 'medium').length
    return (
        <div className="w-full p-6 space-y-6">
            {/* Top Grid: Task Summary & Form */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Priority Summary Cards */}
                <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TaskPriorityCard count={highPriority} status="High">
                        You have {highPriority} high priority task(s).
                    </TaskPriorityCard>
                    <TaskPriorityCard count={mediumPriority} status="Medium">
                        You have {mediumPriority} medium priority task(s).
                    </TaskPriorityCard>
                    <TaskPriorityCard count={lowPriority} status="Low">
                        You have {lowPriority} low priority task(s).
                    </TaskPriorityCard>
                </div>

                {/* Task Input Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Add Task</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <Input
                                name="title"
                                placeholder="Task title"
                                value={task.title}
                                onChange={(e) =>
                                    setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                                }
                            />
                            <select
                                name="priority"
                                className="border rounded px-3 py-2"
                                value={task.priority}
                                onChange={(e) =>
                                    setTask((prev) => ({ ...prev, [e.target.name]: e.target.value }))
                                }
                            >
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                            <Button type="submit">Add</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>

            {/* Task Table */}
            <div className="mt-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Task List</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataTable columns={columns} data={tasks} />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
