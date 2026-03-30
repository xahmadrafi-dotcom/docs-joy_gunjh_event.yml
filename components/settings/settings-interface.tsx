"use client"

import type { User } from "@supabase/supabase-js"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  User as UserIcon,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  ChevronRight,
} from "lucide-react"

interface SettingsInterfaceProps {
  user: User
}

export default function SettingsInterface({ user }: SettingsInterfaceProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/auth/login")
    router.refresh()
  }

  const displayName = user.user_metadata?.full_name || user.email?.split("@")[0] || "User"
  const email = user.email || ""

  const settingsItems = [
    {
      icon: UserIcon,
      label: "প্রোফাইল",
      description: "আপনার তথ্য পরিবর্তন করুন",
    },
    {
      icon: Bell,
      label: "নোটিফিকেশন",
      description: "নোটিফিকেশন সেটিংস",
    },
    {
      icon: Shield,
      label: "প্রাইভেসি",
      description: "প্রাইভেসি ও সিকিউরিটি",
    },
    {
      icon: HelpCircle,
      label: "সাহায্য",
      description: "FAQ এবং সাপোর্ট",
    },
  ]

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
        <h1 className="font-semibold text-foreground">সেটিংস</h1>
      </header>

      <div className="flex-1 overflow-y-auto">
        {/* Profile Card */}
        <div className="p-4">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <UserIcon className="w-7 h-7" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-foreground">{displayName}</h2>
              <p className="text-sm text-muted-foreground truncate">{email}</p>
            </div>
          </div>
        </div>

        {/* Settings Items */}
        <div className="px-4 space-y-2">
          {settingsItems.map((item) => (
            <button
              key={item.label}
              className="flex items-center gap-3 w-full p-4 rounded-xl bg-card border border-border hover:bg-muted/50 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                <item.icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* Logout */}
        <div className="p-4 mt-4">
          <Button
            variant="destructive"
            className="w-full h-12"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-2" />
            লগআউট
          </Button>
        </div>

        {/* App Version */}
        <div className="p-4 text-center">
          <p className="text-xs text-muted-foreground">Sahayak v1.0.0</p>
        </div>
      </div>
    </div>
  )
}
