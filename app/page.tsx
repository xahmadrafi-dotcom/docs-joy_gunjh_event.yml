import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Bot, MessageSquare, CheckSquare, FileText, Sparkles } from "lucide-react"

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    redirect("/chat")
  }

  return (
    <main className="min-h-dvh flex flex-col bg-background">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-6">
          <Bot className="w-10 h-10 text-primary" />
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-3 text-balance">
          Sahayak
        </h1>
        <p className="text-lg text-muted-foreground mb-2">
          আপনার AI পার্সোনাল অ্যাসিস্ট্যান্ট
        </p>
        <p className="text-sm text-muted-foreground max-w-xs mb-8 text-pretty">
          প্রোডাক্টিভিটি বাড়ান, AI-এর সাহায্যে কাজ করুন, এবং সব কিছু এক জায়গায় ম্যানেজ করুন
        </p>

        {/* Features */}
        <div className="grid grid-cols-2 gap-3 w-full max-w-xs mb-8">
          <div className="flex flex-col items-center p-4 rounded-xl bg-card border border-border">
            <MessageSquare className="w-6 h-6 text-primary mb-2" />
            <span className="text-xs text-muted-foreground">AI চ্যাট</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-xl bg-card border border-border">
            <CheckSquare className="w-6 h-6 text-accent mb-2" />
            <span className="text-xs text-muted-foreground">টাস্ক ম্যানেজমেন্ট</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-xl bg-card border border-border">
            <FileText className="w-6 h-6 text-primary mb-2" />
            <span className="text-xs text-muted-foreground">নোট নেওয়া</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-xl bg-card border border-border">
            <Sparkles className="w-6 h-6 text-accent mb-2" />
            <span className="text-xs text-muted-foreground">ফাইল বিশ্লেষণ</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Button asChild size="lg" className="w-full h-12 text-base">
            <Link href="/auth/sign-up">শুরু করুন</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full h-12 text-base">
            <Link href="/auth/login">লগইন করুন</Link>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-4 text-center">
        <p className="text-xs text-muted-foreground">
          Made with AI
        </p>
      </footer>
    </main>
  )
}
