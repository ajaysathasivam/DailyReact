import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Label } from '../components/ui/label'
import { Switch } from '../components/ui/switch'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
const WeekStreaks = ({ streak = {},}) => {
  

    return (
        <Card
            className={`p-4 rounded-2xl shadow-sm border transition-colors duration-300 ${streak?.done
                ? "bg-green-50 border-green-300"
                : streak?.undone
                    ? "bg-yellow-50 border-yellow-300"
                    : "bg-gray-50 border-gray-200"
                }`}
        >
            <CardContent className="space-y-4 text-center px-1">
                {/* Day Label */}
                <div className="text-xs font-semibold text-gray-500 tracking-wider uppercase">
                    {streak?.day}
                </div>

                {/* Total Streak Count */}
                <div className="text-sm font-medium text-gray-700">
                    Total Streak:{" "}
                    <span className="font-bold text-gray-900">{streak.total_Streak}</span>
                </div>

                {/* Done & Undone Display */}
                <div className="flex justify-center flex-col gap-4 mt-2">
                    {/* Done Count */}
                    <div className="flex flex-col items-center">
                        <div className="text-xs text-gray-600 mb-1">Done</div>
                        <div className={`${streak.done !== 0 ? "bg-green-200 text-green-900 border border-green-400" : "bg-gray-100 text-gray-600 border border-gray-300"} px-9 py-2 rounded-lg text-lg font-bold shadow-inner`}>
                            {streak.done}
                        </div>
                    </div>
                    {/* Undone Count */}
                    <div className="flex flex-col   items-center">
                        <div className="text-xs text-gray-600 mb-1">Undone</div>
                        <div className={`${streak.undone !== 0 ? "bg-yellow-100 text-yellow-900 border border-yellow-300" : "bg-gray-100 text-gray-600 border border-gray-300"} px-9 py-2 rounded-lg text-lg font-semibold shadow-sm`}>
                            {streak.undone}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>


    )

}


const TodayStreak = ({ updateStatus = () => { }, key, title, isCompleted = false }) => {
    return (
        <Card className="p-4 rounded-2xl shadow-sm bg-white border border-gray-200 transition hover:shadow-md">
            <CardContent className="flex flex-col sm:flex-row justify-between items-center gap-4 px-2 py-2">
                <div className="text-left w-full sm:w-auto">
                    <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                    <p className="text-sm text-gray-500">Today's streak goal</p>
                </div>

                <div className="flex items-center gap-3">
                    <Label htmlFor="streak-switch" className="text-sm text-gray-700">
                        {isCompleted ? "Completed" : "Pending"}
                    </Label>
                    <Switch
                        id="streak-switch"
                        checked={isCompleted}
                        onCheckedChange={() => updateStatus(key)}
                    />
                </div>
            </CardContent>
        </Card>
    )
}

const DailyStreak = () => {
    const [todayStreak, settodayStreak] = useState({
        title: '',
        marked_at: null,
        created_at: null,
        status: 0
    })
    const [allStreaks, setStreaks] = useState([])
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!(todayStreak?.title)) return

        setStreaks(pre => [...pre, todayStreak])
        settodayStreak({ title: '', marked_at: null, created_at: null, status: 0 })
    }
    const handleUpdate = (index) => {
        console.log(index)
        const indexStreak = allStreaks.findIndex((_, i) => i === index)

        if (indexStreak !== -1) {
            const updated = [...allStreaks]
            const currentStatus = updated[indexStreak].status
            updated[indexStreak] = {
                ...updated[indexStreak],
                status: currentStatus === 0 ? 1 : 0,
                marked_at: currentStatus === 0 ? new Date() : null
            }
            setStreaks(updated)
        }

    }
    const totalStreaks = {
        total_Streak: 0,
        done: 0,
        undone: 0
    }
    const weekStreaks = [
        { day: 'Mon', done: 0, undone: 0, total_Streak: 0 },
        { day: 'Tue', done: 0, undone: 0, total_Streak: 0 },
        { day: 'Wed', done: 0, undone: 0, total_Streak: 0 },
        { day: 'Thu', done: 0, undone: 0, total_Streak: 0 },
        { day: 'Fri', done: 0, undone: 0, total_Streak: 0 },
        { day: 'Sat', done: 0, undone: 0, total_Streak: 0 },
        { day: 'Sun', done: 0, undone: 0, total_Streak: 0 },
    ]


    allStreaks?.forEach(element => {
        const currentDate = new Date(element.created_at)
        let currentDay = currentDate.getDay() // 0 (Sun) - 6 (Sat)

        // Shift Sunday (0) to the last index
        currentDay = currentDay === 0 ? 6 : currentDay - 1

        if (element.status === 1) {
            weekStreaks[currentDay].done += 1
            totalStreaks.done += 1
        } else {
            weekStreaks[currentDay].undone += 1
            totalStreaks.undone += 1
        }

        weekStreaks[currentDay].total_Streak += 1
        totalStreaks.total_Streak += 1
    })



    return (
        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-3 gap-2 p-4">
            <Card className="col-span-1 md:col-span-12">
                <CardContent className="text-center p-4">
                    <h2 className="text-2xl font-bold mb-4">Daily Streaks</h2>
                    <div className="grid grid-cols-7 gap-2">
                        {weekStreaks.map((streak, index) => (
                            <WeekStreaks key={index} totalStreaks={totalStreaks.total_Streak} streak={streak} />
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-6 md:row-start-2">
                <CardContent className="text-center p-4 max-h-[400px] overflow-scroll" >
                    {allStreaks?.map(({ title, status }, index) => (
                        <TodayStreak
                            key={index}
                            title={title}
                            isCompleted={status}
                            updateStatus={() => handleUpdate(index)}
                        />
                    ))}

                </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-6 md:col-start-7 md:row-start-2">
                <CardContent className="text-center p-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Add Task</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                                <Input
                                    name="title"
                                    placeholder="Task title"
                                    value={todayStreak.title}
                                    onChange={(e) =>
                                        settodayStreak((prev) => ({ ...prev, [e.target.name]: e.target.value, created_at: new Date() }))
                                    }
                                />

                                <Button type="submit">Add</Button>
                            </form>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>

            {/* <Card className="col-span-1 md:col-span-12 md:row-start-3">
                <CardContent className="text-center p-4">4</CardContent>
            </Card> */}
        </div>
    )
}

export default DailyStreak