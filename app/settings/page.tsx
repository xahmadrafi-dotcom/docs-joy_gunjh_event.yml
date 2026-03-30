import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import SettingsInterface from "@/components/settings/settings-interface"

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return <SettingsInterface user={user} />
}
