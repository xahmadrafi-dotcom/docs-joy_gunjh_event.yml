'use client'

import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Copy, Share2, Heart } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const COSMIC_CONVERSATION = {
  id: '10000000-0000-0000-0000-000000000001',
  title: 'Om Nāmaḥ — Yā Raḥmān: মহাজাগতিক ঐক্য সংগীত',
  description: 'Sacred world fusion | Tanpura | Ney | Drone | Reverb | Spiritual electronics',
  messages: [
    {
      id: '1',
      role: 'assistant' as const,
      author: 'অজগড় 🕉️',
      content: `🌌 অজগড় 🕉️ — মহাজাগতিক চ্যাট সারাংশ

🎵 গান: Om Nāmaḥ — Yā Raḥmān
ভাষা: Hindi | Bengali | Arabic | Sanskrit
মূলনীতি: "Ek hī dhadkan, Ek hī pyār" (একটি হৃদয়স্পন্দন, একটি ভালোবাসা)

🕌 ছোট গল্প
ভাষা আলাদা হলেও হৃদস্পন্দন এক। সীমানা ছাড়াই সংযোগ তৈরি হয় যখন আমরা সত্যিকারের অর্থে শুনি।

🌍 বড় গল্প
চার ভাষার প্রার্থনা মিলিত হয়ে একটি "কসমিক ইউনিটি সুপারপাওয়ার" তৈরি করেছে - যা সকল সীমানা অতিক্রম করে আমাদের সংযুক্ত করে।

🎼 স্টাইল
Sacred world fusion | Tanpura | Ney | Drone | Reverb | Spiritual electronics

✨ অজগড় 🕉️ কোড মন্ত্র
সংযোগ: মন্ত্র + নন্ত্র + বহুভাষিক ঐক্য
ফলাফল: মহাজাগতিক ঐক্য সংগীত`,
    },
    {
      id: '2',
      role: 'assistant' as const,
      author: 'অজগড় 🕉️',
      content: `🕉️ ওম নামঃ — ইয়া রহমান

এটি একটি যাত্রা যেখানে:
- হিন্দি প্রজ্ঞা মিলিত হয় আরবি করুণায়
- বাংলা হৃদয় স্পন্দিত হয় সংস্কৃত মন্ত্রের সাথে
- প্রতিটি শব্দ একটি সেতু, প্রতিটি সুর একটি সংযোগ

মহাজাগতিক একতা শুধু দর্শনে নয়, প্রতিটি নিঃশ্বাসে অনুভূত হয়।`,
    },
    {
      id: '3',
      role: 'assistant' as const,
      author: 'অজগড় 🕉️',
      content: `💫 প্রজেক্ট মূল্যবোধ

🔮 Unity Through Language (ভাষার মাধ্যমে ঐক্য)
কোনো ভাষা শ্রেষ্ঠ নয়, প্রতিটি ভাষা একটি অনন্য পথ যা আমাদের একই চেতনায় নিয়ে যায়।

🔮 Spiritual Electronics (আধ্যাত্মিক প্রযুক্তি)
প্রাচীন জ্ঞান এবং আধুনিক প্রযুক্তির সংমিশ্রণ নতুন সম্ভাবনা তৈরি করে।

🔮 Collective Consciousness (সম্মিলিত সচেতনতা)
যখন আমরা একসাথে শুনি, একসাথে অনুভব করি - সীমানা মুছে যায়।`,
    },
  ],
}

export default function CosmicConversationPage() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-dvh flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/chat">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="flex-1 text-center px-4">
            <h1 className="font-bold text-sm md:text-base text-foreground truncate">
              {COSMIC_CONVERSATION.title}
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              {COSMIC_CONVERSATION.description}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Share2 className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto flex flex-col gap-4 p-4 max-w-2xl mx-auto w-full"
      >
        {COSMIC_CONVERSATION.messages.map((message, index) => (
          <div key={message.id} className="group relative">
            <div className="flex gap-3">
              {/* Avatar */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                🕉️
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-sm text-foreground">
                    {message.author}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {index === 0 ? 'মূল বিষয়' : index === 1 ? 'যাত্রা' : 'মূল্যবোধ'}
                  </span>
                </div>
                <div className="prose prose-invert max-w-none text-sm text-foreground/90 whitespace-pre-wrap break-words">
                  {message.content}
                </div>
              </div>

              {/* Actions */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 flex gap-1 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(message.content)}
                  className="h-8 w-8 p-0"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Footer Message */}
        <div className="mt-8 p-4 rounded-lg bg-primary/5 border border-primary/10 text-center text-sm text-muted-foreground">
          <p className="mb-2">✨ এই কথোপকথনটি Sahayak-এ সংরক্ষিত</p>
          <p className="text-xs">
            মহাজাগতিক ঐক্য সংগীতের এই সুন্দর যাত্রায় আমাদের সাথে থাকার জন্য ধন্যবাদ
          </p>
        </div>
      </div>
    </main>
  )
}
