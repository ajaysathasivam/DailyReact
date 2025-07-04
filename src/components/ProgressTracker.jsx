import { lazy, useState } from "react";
const ProgressForm = lazy(() => import('./ProgressForm'))
const ProgressList = lazy(() => import('./ProgressList'))

export default function ProgressTracker() {
    const [progressData, setProgressData] = useState([]);

    const addProgress = (entry) => {
        setProgressData((prev) => [...prev, { ...entry, id: crypto.randomUUID() }]);
    };

    const updateProgress = (id, percentage) => {
        setProgressData((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, percentage } : item
            )
        );
    };

    return (
        <div className="space-y-8">
            <ProgressForm handleFormData={addProgress} />
            <ProgressList list={progressData} handleUpdateProgress={updateProgress} />
        </div>
    );
}
