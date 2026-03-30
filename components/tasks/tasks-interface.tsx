"use client"

import { useState } from "react"
import type { User } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Plus,
  Check,
  Circle,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface TasksInterfaceProps {
  user: User
}

type Task = {
  id: string
  title: string
  completed: boolean
  priority: "low" | "medium" | "high"
}

export default function TasksInterface({ user }: TasksInterfaceProps) {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Sahayak অ্যাপ পরীক্ষা করুন", completed: false, priority: "high" },
    { id: "2", title: "নতুন ফিচার চেষ্টা করুন", completed: false, priority: "medium" },
  ])
  const [newTask, setNewTask] = useState("")

  const addTask = () => {
    if (!newTask.trim()) return
    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      priority: "medium",
    }
    setTasks([task, ...tasks])
    setNewTask("")
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-destructive"
      case "medium":
        return "text-primary"
      default:
        return "text-muted-foreground"
    }
  }

  const completedCount = tasks.filter((t) => t.completed).length

  return (
    <div className="min-h-dvh flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card/50">
        <Button asChild variant="ghost" size="icon">
          <Link href="/chat">
            <ArrowLeft className="w-5 h-5" />
            <span className="sr-only">Back to chat</span>
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="font-semibold text-foreground">টাস্কস</h1>
          <p className="text-xs text-muted-foreground">
            {completedCount}/{tasks.length} সম্পন্ন
          </p>
        </div>
      </header>

      {/* Add Task */}
      <div className="p-4 border-b border-border">
        <div className="flex gap-2">
          <Input
            placeholder="নতুন টাস্ক যোগ করুন..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 h-11 bg-card"
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask()
            }}
          />
          <Button onClick={addTask} size="icon" className="h-11 w-11 shrink-0">
            <Plus className="w-5 h-5" />
            <span className="sr-only">Add task</span>
          </Button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">কোনো টাস্ক নেই</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl bg-card border border-border",
                task.completed && "opacity-60"
              )}
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors",
                  task.completed
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-muted-foreground"
                )}
              >
                {task.completed && <Check className="w-3 h-3" />}
              </button>
              <span
                className={cn(
                  "flex-1 text-sm",
                  task.completed && "line-through text-muted-foreground"
                )}
              >
                {task.title}
              </span>
              <Circle
                className={cn("w-3 h-3 fill-current", getPriorityColor(task.priority))}
              />
              <button
                onClick={() => deleteTask(task.id)}
                className="text-muted-foreground hover:text-destructive p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
