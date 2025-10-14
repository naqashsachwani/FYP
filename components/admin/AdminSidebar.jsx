'use client'
import { usePathname } from "next/navigation"
import { HomeIcon, ShieldCheckIcon, StoreIcon, TicketPercentIcon, ChevronRightIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"

const AdminSidebar = () => {
    const { user } = useUser()
    const pathname = usePathname()

    const sidebarLinks = [
        { name: 'Dashboard', href: '/admin', icon: HomeIcon },
        { name: 'Stores', href: '/admin/stores', icon: StoreIcon },
        { name: 'Approve Store', href: '/admin/approve', icon: ShieldCheckIcon },
        { name: 'Coupons', href: '/admin/coupons', icon: TicketPercentIcon },
    ]

    return (
        <div className="flex flex-col h-full bg-white/80 backdrop-blur-md border-r border-slate-200/60 w-full sm:w-64 shadow-sm">
            {/* Mobile Header */}
            <div className="sm:hidden flex items-center gap-3 p-4 border-b border-slate-200">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                    A
                </div>
                <div>
                    <p className="text-sm font-semibold text-slate-800">Admin Panel</p>
                    <p className="text-xs text-slate-500">DreamSaver</p>
                </div>
            </div>

            {/* Desktop Profile */}
            <div className="hidden sm:flex flex-col gap-3 justify-center items-center pt-8 pb-6">
                <div className="relative">
                    <Image
                        className="w-16 h-16 rounded-2xl border-2 border-white shadow-md"
                        src={user?.imageUrl || "/default-avatar.png"} // ✅ fallback image
                        alt="Admin profile"
                        width={80}
                        height={80}
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div className="text-center">
                    <p className="text-slate-800 font-semibold">{user?.fullName || "Admin"}</p>
                    <p className="text-slate-500 text-sm">Administrator</p>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4">
                <div className="space-y-2">
                    {sidebarLinks.map((link, index) => {
                        const isActive = pathname === link.href
                        return (
                            <Link
                                key={index}
                                href={link.href}
                                className={`relative flex items-center justify-between group rounded-xl p-3 transition-all duration-200 ${
                                    isActive
                                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 text-blue-600 shadow-sm'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <link.icon
                                        size={20}
                                        className={isActive ? 'text-blue-500' : 'text-slate-400 group-hover:text-slate-600'}
                                    />
                                    <span className={`font-medium ${isActive ? 'text-blue-600' : 'group-hover:text-slate-800'}`}>
                                        {link.name}
                                    </span>
                                </div>
                                {isActive && <ChevronRightIcon size={16} className="text-blue-500" />}
                            </Link>
                        )
                    })}
                </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-200">
                <div className="bg-slate-50 rounded-xl p-3 text-center">
                    <p className="text-xs text-slate-600">DreamSaver Admin</p>
                    <p className="text-xs text-slate-400 mt-1">v2.1.0</p>
                </div>
            </div>
        </div>
    )
}

export default AdminSidebar
