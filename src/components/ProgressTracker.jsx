import React, { useState } from 'react'
import ProgressForm from './ProgressForm';
import ProgressList from './ProgressList';

const ProgressTracker = () => {

    const [progressData, setProgressData] = useState([]);

    const handleFormData = (newEntry) => {
        const id = crypto.randomUUID();
        setProgressData((prev) => [...prev, { ...newEntry, id }]);
    };

    const handleUpdateProgress = (id, updatedPercentage) => {
        setProgressData((prev) =>
            prev.map((item) => (item.id === id ? { ...item, percentage: updatedPercentage } : item))
        );
    };

    return (
        <div className="space-y-8">
            <ProgressForm handleFormData={handleFormData} />
            <ProgressList list={progressData} handleUpdateProgress={handleUpdateProgress} />
        </div>
    );
}

export default ProgressTracker
