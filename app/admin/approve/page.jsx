'use client'
import { storesDummyData } from "@/assets/assets"
import StoreInfo from "@/components/admin/StoreInfo"
import Loading from "@/components/Loading"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useAuth, useUser } from "@clerk/nextjs"
import axios from "axios"
import { Shield, CheckCircle, XCircle, Clock, AlertCircle, Users, Store, Filter, Search, TrendingUp } from "lucide-react"

export default function AdminApprove() {

  const { user } = useUser()
  const { getToken } = useAuth()
  const [stores, setStores] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("pending")

  const fetchStores = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get('/api/admin/approve-store', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setStores(data.stores)
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message)
    }
    setLoading(false)
  }

  const handleApprove = async ({ storeId, status }) => {
    try {
      const token = await getToken()
      const { data } = await axios.post('/api/admin/approve-store', { storeId, status }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success(data.message)
      await fetchStores()
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message)
    }
  }

  useEffect(() => {
    if (user) {
      fetchStores()
    }
  }, [user])

  // Filter stores based on search and status
  const filteredStores = stores.filter(store => {
    const matchesSearch = store.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        store.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        store.user.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || store.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Calculate stats
  const pendingCount = stores.filter(store => store.status === 'pending').length
  const approvedCount = stores.filter(store => store.status === 'approved').length
  const rejectedCount = stores.filter(store => store.status === 'rejected').length

  if (loading) return (
    <div className="flex items-center justify-center min-h-96">
      <Loading />
    </div>
  )

  return (
    <div className="space-y-6 mb-28 px-4 md:px-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Store Approvals</h1>
          <p className="text-slate-600 mt-2">Review and approve store registration requests for DreamSaver</p>
        </div>
        <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-3 rounded-2xl border border-blue-100">
          <Shield size={18} className="text-blue-600" />
          <span className="text-sm text-blue-700 font-medium">Admin Approval Panel</span>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Pending Review</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">{pendingCount}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Approved Stores</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{approvedCount}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-600 text-sm">Rejected Stores</p>
              <p className="text-3xl font-bold text-red-600 mt-2">{rejectedCount}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search stores by name, username, or owner..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-3">
              <span className="text-slate-700 text-sm font-medium">Filter by:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
              >
                <option value="all">All Applications</option>
                <option value="pending">Pending Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          <div className="text-sm text-slate-500 bg-slate-100 px-3 py-2 rounded-lg">
            {filteredStores.length} store{filteredStores.length !== 1 ? 's' : ''} found
          </div>
        </div>
      </div>

      {/* Stores Grid */}
      {filteredStores.length ? (
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
            >
              {/* Store Header with Status */}
              <div className={`px-6 py-4 border-b ${
                store.status === 'pending' ? 'bg-yellow-50 border-yellow-200' :
                store.status === 'approved' ? 'bg-green-50 border-green-200' :
                'bg-red-50 border-red-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      store.status === 'pending' ? 'bg-yellow-500' :
                      store.status === 'approved' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <span className={`text-sm font-semibold ${
                      store.status === 'pending' ? 'text-yellow-800' :
                      store.status === 'approved' ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {store.status.charAt(0).toUpperCase() + store.status.slice(1)}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Applied {new Date(store.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Store Content */}
              <div className="p-6">
                <StoreInfo store={store} />

                {/* Approval Actions */}
                {store.status === 'pending' && (
                  <div className="flex gap-3 mt-6 pt-6 border-t border-slate-200">
                    <button
                      onClick={() =>
                        toast.promise(handleApprove({ storeId: store.id, status: 'approved' }), {
                          loading: 'Approving store application...',
                          success: 'Store approved successfully!',
                          error: 'Failed to approve store'
                        })
                      }
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <CheckCircle size={18} />
                      Approve Store
                    </button>
                    <button
                      onClick={() =>
                        toast.promise(handleApprove({ storeId: store.id, status: 'rejected' }), {
                          loading: 'Rejecting store application...',
                          success: 'Store rejected successfully!',
                          error: 'Failed to reject store'
                        })
                      }
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <XCircle size={18} />
                      Reject Store
                    </button>
                  </div>
                )}

                {/* Status Message for non-pending stores */}
                {store.status !== 'pending' && (
                  <div className={`mt-6 p-4 rounded-xl border ${
                    store.status === 'approved' ? 'bg-green-50 border-green-200 text-green-800' :
                    'bg-red-50 border-red-200 text-red-800'
                  }`}>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      {store.status === 'approved' ? (
                        <>
                          <CheckCircle size={16} />
                          This store has been approved for DreamSaver
                        </>
                      ) : (
                        <>
                          <XCircle size={16} />
                          This store application has been rejected
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Store Footer */}
              <div className="bg-slate-50 px-6 py-3 border-t border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Store size={12} />
                    <span>Store Application</span>
                  </div>
                  <div>
                    Application ID: <span className="font-mono">{store.id}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">
            {searchTerm || statusFilter !== "all" ? "No matching stores found" : "No applications pending"}
          </h3>
          <p className="text-slate-500 max-w-md mx-auto">
            {searchTerm || statusFilter !== "all" 
              ? "Try adjusting your search or filter criteria to find what you're looking for."
              : "All store applications have been reviewed. New applications will appear here automatically."
            }
          </p>
          {(searchTerm || statusFilter !== "all") && (
            <button 
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("all")
              }}
              className="mt-4 px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  )
}