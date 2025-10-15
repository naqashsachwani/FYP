'use client'
import Link from "next/link"
import { useUser, UserButton } from "@clerk/nextjs"
import { CrownIcon, MenuIcon, XIcon } from "lucide-react"

export default function AdminNavbar({ onToggleSidebar, isSidebarOpen }) {
  const { user } = useUser()

  return (
    <header className="flex items-center justify-between px-4 lg:px-8 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm sticky top-0 z-50">
      {/* Left: Mobile Sidebar Toggle + Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition"
        >
          {isSidebarOpen ? <XIcon size={22} /> : <MenuIcon size={22} />}
        </button>

        <Link
          href="/"
          className="relative text-2xl lg:text-3xl font-bold text-slate-800 hover:scale-105 transition-transform"
        >
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dream
          </span>
          Saver
          <span className="absolute -top-2 -right-14 px-2.5 py-0.5 rounded-full flex items-center gap-1.5 text-[10px] font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-md">
            <CrownIcon size={10} />
            Admin
          </span>
        </Link>
      </div>

      {/* Right: User Info */}
      <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-3 lg:px-4 py-2 shadow-sm hover:shadow-md transition-all">
        <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
          {user?.firstName?.[0] || 'A'}
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-slate-700">Hi, {user?.firstName || 'Naqash'}</p>
          <p className="text-xs text-slate-500">Administrator</p>
        </div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  )
}
