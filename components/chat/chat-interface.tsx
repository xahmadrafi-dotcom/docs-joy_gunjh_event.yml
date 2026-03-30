"use client"

import { useState, useRef } from "react"
import type { User } from "@supabase/supabase-js"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Send,
  Paperclip,
  Menu,
  Bot,
  User as UserIcon,
  ImageIcon,
  FileText,
  Mic,
  X,
  Loader2,
} from "lucide-react"
import { ChatSidebar } from "./chat-sidebar"
import { cn } from "@/lib/utils"

interface ChatInterfaceProps {
  user: User
}

type FilePreview = {
  file: File
  preview: string
  type: "image" | "document" | "audio"
}

// Helper to get text from UIMessage parts
function getMessageText(message: { parts?: Array<{ type: string; text?: string }> }): string {
  if (!message.parts || !Array.isArray(message.parts)) return ""
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("")
}

export default function ChatInterface({ user }: ChatInterfaceProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [files, setFiles] = useState<FilePreview[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      body: {
        userId: user.id,
      },
    }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (!selectedFiles) return

    const newFiles: FilePreview[] = []
    Array.from(selectedFiles).forEach((file) => {
      let type: "image" | "document" | "audio" = "document"
      let preview = ""

      if (file.type.startsWith("image/")) {
        type = "image"
        preview = URL.createObjectURL(file)
      } else if (file.type.startsWith("audio/")) {
        type = "audio"
      }

      newFiles.push({ file, preview, type })
    })

    setFiles((prev) => [...prev, ...newFiles])
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev]
      if (newFiles[index].preview) {
        URL.revokeObjectURL(newFiles[index].preview)
      }
      newFiles.splice(index, 1)
      return newFiles
    })
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() && files.length === 0) return

    let messageText = inputValue

    if (files.length > 0) {
      setIsUploading(true)
      // Upload files first
      const uploadedUrls: string[] = []
      for (const filePreview of files) {
        const formData = new FormData()
        formData.append("file", filePreview.file)
        try {
          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          })
          const data = await res.json()
          if (data.pathname) {
            uploadedUrls.push(data.pathname)
          }
        } catch (err) {
          console.error("Upload error:", err)
        }
      }
      setIsUploading(false)
      setFiles([])

      // Add file info to message
      if (uploadedUrls.length > 0) {
        messageText += `\n[Attached files: ${uploadedUrls.join(", ")}]`
      }
    }

    setInputValue("")
    sendMessage({ text: messageText })
  }

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <ImageIcon className="w-4 h-4" />
      case "audio":
        return <Mic className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const displayName = user.user_metadata?.full_name || user.email?.split("@")[0] || "User"

  return (
    <div className="flex h-dvh bg-background">
      {/* Sidebar */}
      <ChatSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        user={user}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center gap-3 px-4 py-3 border-b border-border bg-card/50 backdrop-blur-sm">
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-5 h-5" />
            <span className="sr-only">Menu</span>
          </Button>
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0">
              <h1 className="font-semibold text-foreground truncate">Sahayak</h1>
              <p className="text-xs text-muted-foreground">AI Assistant</p>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Bot className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                স্বাগতম, {displayName}!
              </h2>
              <p className="text-muted-foreground text-sm max-w-xs">
                আমি Sahayak, আপনার AI অ্যাসিস্ট্যান্ট। আমাকে যেকোনো প্রশ্ন জিজ্ঞাসা করুন 
                বা ফাইল আপলোড করে বিশ্লেষণ করতে বলুন।
              </p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.role === "user" ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border"
                )}
              >
                {message.role === "user" ? (
                  <UserIcon className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4 text-primary" />
                )}
              </div>
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2.5",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                    : "bg-card border border-border rounded-tl-sm"
                )}
              >
                <p className="text-sm whitespace-pre-wrap">{getMessageText(message)}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="bg-card border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* File Previews */}
        {files.length > 0 && (
          <div className="px-4 py-2 border-t border-border bg-card/50">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {files.map((filePreview, index) => (
                <div
                  key={index}
                  className="relative shrink-0 w-16 h-16 rounded-lg bg-muted overflow-hidden"
                >
                  {filePreview.type === "image" && filePreview.preview ? (
                    <img
                      src={filePreview.preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      {getFileIcon(filePreview.type)}
                    </div>
                  )}
                  <button
                    onClick={() => removeFile(index)}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <form onSubmit={onSubmit} className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
          <div className="flex items-end gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,audio/*,.pdf,.doc,.docx,.txt"
              multiple
              className="hidden"
              onChange={handleFileSelect}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="shrink-0 text-muted-foreground hover:text-foreground"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="w-5 h-5" />
              <span className="sr-only">Attach file</span>
            </Button>

            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="আপনার বার্তা লিখুন..."
                className="min-h-[44px] max-h-32 resize-none bg-background border-border pr-12"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    onSubmit(e)
                  }
                }}
              />
            </div>

            <Button
              type="submit"
              size="icon"
              className="shrink-0 h-11 w-11"
              disabled={isLoading || isUploading || (!inputValue.trim() && files.length === 0)}
            >
              {isLoading || isUploading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
