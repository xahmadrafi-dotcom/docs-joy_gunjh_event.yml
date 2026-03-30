import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Mail, ArrowLeft } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center p-6 bg-background">
      <div className="w-full max-w-sm space-y-8 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
          <Mail className="w-10 h-10 text-primary" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">ইমেইল যাচাই করুন</h1>
          <p className="text-muted-foreground">
            আমরা আপনার ইমেইলে একটি যাচাইকরণ লিংক পাঠিয়েছি। 
            অনুগ্রহ করে আপনার ইনবক্স চেক করুন এবং লিংকে ক্লিক করুন।
          </p>
        </div>

        <div className="p-4 rounded-lg bg-card border border-border">
          <p className="text-sm text-muted-foreground">
            ইমেইল না পেলে স্প্যাম ফোল্ডার চেক করুন
          </p>
        </div>

        <Button asChild variant="outline" className="w-full h-12">
          <Link href="/auth/login">
            <ArrowLeft className="w-4 h-4 mr-2" />
            লগইন পেজে ফিরে যান
          </Link>
        </Button>
      </div>
    </main>
  )
}
