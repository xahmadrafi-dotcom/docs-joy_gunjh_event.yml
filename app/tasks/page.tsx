import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import TasksInterface from "@/components/tasks/tasks-interface"

export default async function TasksPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return <TasksInterface user={user} />
}
