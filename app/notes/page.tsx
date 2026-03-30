import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import NotesInterface from "@/components/notes/notes-interface"

export default async function NotesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return <NotesInterface user={user} />
}
