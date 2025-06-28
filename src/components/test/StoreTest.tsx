'use client';

import { useState } from 'react';
import { useGoalsStore } from '@/lib/stores/goals-store';
import { useTasksStore } from '@/lib/stores/tasks-store';
import { useHydration } from '@/lib/hooks/use-hydration';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function StoreTest() {
  const hasHydrated = useHydration();
  const { goals, addGoal, updateGoal } = useGoalsStore();
  const { tasks, addTask, toggleTaskComplete } = useTasksStore();
  const [newGoal, setNewGoal] = useState('');
  const [newTask, setNewTask] = useState('');

  // Don't render until hydrated to prevent mismatch
  if (!hasHydrated) {
    return <div>Loading stores...</div>;
  }

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      addGoal({
        id: crypto.randomUUID(),
        userId: 'test-user',
        title: newGoal.trim(),
        description: '',
        category: 'Personal',
        targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        isCompleted: false,
        progress: 0,
        subGoals: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      setNewGoal('');
    }
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask({
        id: crypto.randomUUID(),
        userId: 'test-user',
        title: newTask.trim(),
        description: '',
        timeSlot: 'morning',
        date: new Date(),
        isCompleted: false,
        isMissionOfDay: false,
        createdAt: new Date(),
      });
      setNewTask('');
    }
  };

  const toggleGoal = (id: string) => {
    const goal = goals.find(g => g.id === id);
    if (goal) {
      updateGoal(id, { isCompleted: !goal.isCompleted });
    }
  };

  const toggleTask = (id: string) => {
    toggleTaskComplete(id);
  };

  return (
    <div className="space-y-6">
      {/* Goals Test */}
      <Card>
        <CardHeader>
          <CardTitle>Goals Store Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="Enter a test goal"
              onKeyDown={(e) => e.key === 'Enter' && handleAddGoal()}
            />
            <Button onClick={handleAddGoal}>Add Goal</Button>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Current Goals ({goals.length}):
            </p>
            {goals.length === 0 ? (
              <p className="text-sm text-gray-400">No goals yet. Add one to test persistence!</p>
            ) : (
              <div className="space-y-1">
                {goals.map((goal) => (
                  <div 
                    key={goal.id} 
                    className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={goal.isCompleted}
                      onChange={() => toggleGoal(goal.id)}
                      className="rounded"
                    />
                    <span className={goal.isCompleted ? 'line-through text-gray-500' : ''}>
                      {goal.title}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tasks Test */}
      <Card>
        <CardHeader>
          <CardTitle>Tasks Store Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter a test task"
              onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
            />
            <Button onClick={handleAddTask}>Add Task</Button>
          </div>
          
          <div className="space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Current Tasks ({tasks.length}):
            </p>
            {tasks.length === 0 ? (
              <p className="text-sm text-gray-400">No tasks yet. Add one to test persistence!</p>
            ) : (
              <div className="space-y-1">
                {tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={task.isCompleted}
                      onChange={() => toggleTask(task.id)}
                      className="rounded"
                    />
                    <span className={task.isCompleted ? 'line-through text-gray-500' : ''}>
                      {task.title}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Persistence Test Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Persistence Test</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
            <p><strong>To test persistence:</strong></p>
            <ol className="list-decimal list-inside space-y-1 ml-4">
              <li>Add some goals and tasks above</li>
              <li>Mark some as completed</li>
              <li>Refresh this page</li>
              <li>Check if your data persists!</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
