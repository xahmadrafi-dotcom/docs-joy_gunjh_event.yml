"use client"

import type { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  X,
  MessageSquarePlus,
  CheckSquare,
  FileText,
  Settings,
  LogOut,
  Bot,
  User as UserIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ChatSidebarProps {
  isOpen: boolean
  onClose: () => void
  user: User
}

export function ChatSidebar({ isOpen, onClose, user }: ChatSidebarProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/auth/login")
    router.refresh()
  }

  const displayName = user.user_metadata?.full_name || user.email?.split("@")[0] || "User"
  const email = user.email || ""

  const menuItems = [
    {
      icon: MessageSquarePlus,
      label: "নতুন চ্যাট",
      href: "/chat",
    },
    {
      icon: CheckSquare,
      label: "টাস্কস",
      href: "/tasks",
    },
    {
      icon: FileText,
      label: "নোটস",
      href: "/notes",
    },
    {
      icon: Settings,
      label: "সেটিংস",
      href: "/settings",
    },
  ]

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-border transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <span className="font-semibold text-foreground">Sahayak</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="lg:hidden"
            >
              <X className="w-5 h-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>

          {/* User Profile */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                <UserIcon className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground truncate">{displayName}</p>
                <p className="text-xs text-muted-foreground truncate">{email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start text-muted-foreground hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5 mr-3" />
              লগআউট
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
