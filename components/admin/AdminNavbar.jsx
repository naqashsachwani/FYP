'use client'
import Link from "next/link"
import { useUser, UserButton } from "@clerk/nextjs"
import { CrownIcon } from "lucide-react"

const AdminNavbar = () => {
  const { user } = useUser()

  return (
    <header className="flex items-center justify-between px-4 lg:px-8 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
      {/* Logo */}
      <Link
        href="/"
        className="relative text-3xl font-bold text-slate-800 hover:scale-105 transition-transform"
      >
        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Dream
        </span>
        Saver
        <span className="absolute -top-2 -right-16 px-3 py-1 rounded-full flex items-center gap-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 shadow-md">
          <CrownIcon size={12} />
          Admin
        </span>
      </Link>

      {/* Admin Info */}
      <div className="flex items-center gap-3 bg-slate-50 rounded-2xl px-4 py-2 shadow-sm hover:shadow-md transition-all">
        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
          {user?.firstName?.[0] || 'A'}
        </div>
        <div className="max-sm:hidden">
          <p className="text-sm font-medium text-slate-700">
            Hi, {user?.firstName || 'Naqash'}
          </p>
          <p className="text-xs text-slate-500">Administrator</p>
        </div>
        {/* User Button */}
        <div className="ml-1">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  )
}

export default AdminNavbar
