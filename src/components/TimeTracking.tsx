import React, { useState, useEffect } from 'react';
import { ClockIcon, PlayIcon, PauseIcon, StopIcon } from '@heroicons/react/24/outline';

interface TimeEntry {
  id: string;
  taskName: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
}

const TimeTracking: React.FC = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [currentTask, setCurrentTask] = useState('');
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartTracking = () => {
    if (!currentTask) return;
    setIsTracking(true);
    setElapsedTime(0);
  };

  const handleStopTracking = () => {
    setIsTracking(false);
    const newEntry: TimeEntry = {
      id: Date.now().toString(),
      taskName: currentTask,
      startTime: new Date(Date.now() - elapsedTime * 1000),
      endTime: new Date(),
      duration: elapsedTime,
    };
    setTimeEntries([...timeEntries, newEntry]);
    setCurrentTask('');
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Time Tracking</h2>
      </div>

      <div className="mb-8">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={currentTask}
            onChange={(e) => setCurrentTask(e.target.value)}
            placeholder="Enter task name"
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isTracking}
          />
          {!isTracking ? (
            <button
              onClick={handleStartTracking}
              disabled={!currentTask}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <PlayIcon className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleStopTracking}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <StopIcon className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {isTracking && (
        <div className="text-center mb-8">
          <div className="text-4xl font-bold text-white mb-2">
            {formatTime(elapsedTime)}
          </div>
          <div className="text-gray-400">Tracking: {currentTask}</div>
        </div>
      )}

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Time Entries</h3>
        {timeEntries.map((entry) => (
          <div
            key={entry.id}
            className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
          >
            <div>
              <div className="text-white font-medium">{entry.taskName}</div>
              <div className="text-sm text-gray-400">
                {entry.startTime.toLocaleTimeString()} -{' '}
                {entry.endTime?.toLocaleTimeString()}
              </div>
            </div>
            <div className="text-white font-medium">
              {formatTime(entry.duration)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeTracking; 