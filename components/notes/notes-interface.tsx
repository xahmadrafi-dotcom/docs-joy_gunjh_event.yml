"use client"

import { useState } from "react"
import type { User } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Plus,
  FileText,
  Trash2,
  X,
  Save,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface NotesInterfaceProps {
  user: User
}

type Note = {
  id: string
  title: string
  content: string
  createdAt: Date
}

export default function NotesInterface({ user }: NotesInterfaceProps) {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Sahayak ব্যবহারের টিপস",
      content: "AI চ্যাটে যেকোনো প্রশ্ন করুন। ফাইল আপলোড করে বিশ্লেষণ করতে পারবেন।",
      createdAt: new Date(),
    },
  ])
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState("")
  const [editContent, setEditContent] = useState("")

  const createNote = () => {
    const note: Note = {
      id: Date.now().toString(),
      title: "নতুন নোট",
      content: "",
      createdAt: new Date(),
    }
    setNotes([note, ...notes])
    setSelectedNote(note)
    setEditTitle(note.title)
    setEditContent(note.content)
    setIsEditing(true)
  }

  const saveNote = () => {
    if (!selectedNote) return
    setNotes(
      notes.map((n) =>
        n.id === selectedNote.id
          ? { ...n, title: editTitle, content: editContent }
          : n
      )
    )
    setSelectedNote({ ...selectedNote, title: editTitle, content: editContent })
    setIsEditing(false)
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter((n) => n.id !== id))
    if (selectedNote?.id === id) {
      setSelectedNote(null)
      setIsEditing(false)
    }
  }

  const openNote = (note: Note) => {
    setSelectedNote(note)
    setEditTitle(note.title)
    setEditContent(note.content)
    setIsEditing(false)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("bn-BD", {
      day: "numeric",
      month: "short",
    }).format(date)
  }

  // Note detail view
  if (selectedNote) {
    return (
      <div className="min-h-dvh flex flex-col bg-background">
        <header className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card/50">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setSelectedNote(null)
              setIsEditing(false)
            }}
          >
            <X className="w-5 h-5" />
            <span className="sr-only">Close</span>
          </Button>
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="h-8 bg-transparent border-none px-0 text-base font-semibold"
                placeholder="নোটের শিরোনাম"
              />
            ) : (
              <h1 className="font-semibold text-foreground truncate">
                {selectedNote.title}
              </h1>
            )}
          </div>
          {isEditing ? (
            <Button size="sm" onClick={saveNote}>
              <Save className="w-4 h-4 mr-1" />
              সেভ
            </Button>
          ) : (
            <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
              এডিট
            </Button>
          )}
        </header>

        <div className="flex-1 p-4">
          {isEditing ? (
            <Textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="min-h-[300px] resize-none bg-card"
              placeholder="আপনার নোট এখানে লিখুন..."
            />
          ) : (
            <p className="text-foreground whitespace-pre-wrap">
              {selectedNote.content || "কোনো কন্টেন্ট নেই"}
            </p>
          )}
        </div>
      </div>
    )
  }

  // Notes list view
  return (
    <div className="min-h-dvh flex flex-col bg-background">
      <header className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card/50">
        <Button asChild variant="ghost" size="icon">
          <Link href="/chat">
            <ArrowLeft className="w-5 h-5" />
            <span className="sr-only">Back to chat</span>
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="font-semibold text-foreground">নোটস</h1>
          <p className="text-xs text-muted-foreground">{notes.length} নোট</p>
        </div>
        <Button size="icon" onClick={createNote}>
          <Plus className="w-5 h-5" />
          <span className="sr-only">New note</span>
        </Button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {notes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground mb-4">কোনো নোট নেই</p>
            <Button onClick={createNote}>
              <Plus className="w-4 h-4 mr-2" />
              নতুন নোট তৈরি করুন
            </Button>
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => openNote(note)}
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground truncate">{note.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {note.content || "কোনো কন্টেন্ট নেই"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDate(note.createdAt)}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  deleteNote(note.id)
                }}
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
