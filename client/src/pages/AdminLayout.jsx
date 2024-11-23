import { AdminSidebar } from "@/components/AdminSidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner"

export default function AdminLayout() {
  return (
    <>
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </header>
          <div className="p-10">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
      <Toaster richColors />
    </>
  )
}