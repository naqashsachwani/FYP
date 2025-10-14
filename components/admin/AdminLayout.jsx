'use client'
import { useEffect, useState } from "react"
import Loading from "../Loading"
import Link from "next/link"
import { ArrowRightIcon, CrownIcon } from "lucide-react"
import AdminNavbar from "./AdminNavbar"
import AdminSidebar from "./AdminSidebar"
import { useAuth, useUser } from "@clerk/nextjs"
import axios from "axios"

const AdminLayout = ({ children }) => {
    const { user } = useUser()
    const { getToken } = useAuth()

    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(true)

    const fetchIsAdmin = async () => {
        try {
            const token = await getToken()
            const { data } = await axios.get('/api/admin/is-admin', {
                headers: { Authorization: `Bearer ${token}` }
            })

            // ✅ Assuming your API returns something like { success: true, isAdmin: true }
            if (data?.isAdmin === true) {
                setIsAdmin(true)
            } else {
                setIsAdmin(false)
            }
        } catch (error) {
            console.error("Admin check failed:", error)
            setIsAdmin(false)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user) fetchIsAdmin()
    }, [user])

    return loading ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
            <Loading />
        </div>
    ) : isAdmin ? (
        <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <AdminNavbar />
            <div className="flex flex-1 items-start h-full overflow-hidden">
                <AdminSidebar />
                <main className="flex-1 h-full p-4 lg:p-6 lg:pl-8 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 min-h-full p-4 lg:p-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    ) : (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gradient-to-br from-slate-50 to-slate-100">
            <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md w-full mx-auto border border-slate-200">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
                    <CrownIcon className="w-10 h-10 text-red-500" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">Access Denied</h1>
                <p className="text-slate-600 mb-2">You don't have permission to access this page</p>
                <p className="text-slate-500 text-sm mb-8">This area is restricted to authorized administrators only</p>
                <Link
                    href="/"
                    className="bg-slate-800 hover:bg-slate-900 text-white flex items-center justify-center gap-3 mt-4 p-3 px-8 max-sm:text-sm rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                >
                    Return to Home <ArrowRightIcon size={18} />
                </Link>
            </div>
        </div>
    )
}

export default AdminLayout
