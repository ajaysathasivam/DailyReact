import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

const WeekTaskListComponent = ({ tasks, handleMarkAs }) => {
    if (tasks.length === 0) {
        return (
            <p className="text-center text-gray-500 italic">
                You’ve got this. Start by adding a task ⬆️
            </p>
        );
    }

    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <Card
                    key={task.id}
                    className="backdrop-blur-md bg-white/50 dark:bg-gray-700/40 border border-gray-300 dark:border-gray-600 rounded-xl shadow-md"
                >
                    <CardContent className="p-4 space-y-3">
                        <div className="font-semibold text-lg tracking-wide text-blue-800 dark:text-blue-200">
                            {task.title}
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center text-xs sm:text-sm">
                            {days.map((day, index) => {
                                const today = new Date().getDay(); // 0 (Sun) to 6 (Sat)
                                const adjustedToday = today === 0 ? 6 : today - 1; // make Monday = 0

                                const isPast = adjustedToday > index;
                                const isToday = adjustedToday === index;
                                const isMarked = task.week[day];

                                return (
                                    <Button
                                        key={day}
                                        variant={isMarked ? "secondary" : "ghost"}
                                        className={`capitalize rounded-xl transition-all shadow-sm ${isMarked
                                                ? "bg-green-400/80 text-white hover:bg-green-500"
                                                : "bg-white/40 hover:bg-gray-200 dark:hover:bg-gray-800"
                                            }`}
                                        disabled={isPast || isMarked}
                                        onClick={() => handleMarkAs(task.id, day)}
                                    >
                                        {isMarked ? "✓" : isToday ? `${day}` : day}
                                    </Button>
                                );
                            })}

                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default WeekTaskListComponent;
