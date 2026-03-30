import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle, ArrowLeft } from "lucide-react"

export default function AuthErrorPage() {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center p-6 bg-background">
      <div className="w-full max-w-sm space-y-8 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10">
          <AlertCircle className="w-10 h-10 text-destructive" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">কিছু ভুল হয়েছে</h1>
          <p className="text-muted-foreground">
            অথেন্টিকেশনে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।
          </p>
        </div>

        <Button asChild className="w-full h-12">
          <Link href="/auth/login">
            <ArrowLeft className="w-4 h-4 mr-2" />
            লগইন পেজে ফিরে যান
          </Link>
        </Button>
      </div>
    </main>
  )
}
