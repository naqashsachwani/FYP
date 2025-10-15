'use client'
import { useEffect, useState } from "react"
import { format } from "date-fns"
import toast from "react-hot-toast"
import { DeleteIcon, PlusIcon, UsersIcon, UserCheckIcon } from "lucide-react"
import { useAuth } from "@clerk/nextjs"
import axios from "axios"

export default function AdminCoupons() {
  const { getToken } = useAuth()
  const [coupons, setCoupons] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [newCoupon, setNewCoupon] = useState({
    code: '',
    description: '',
    discount: '',
    forNewUser: false,
    forMember: false,
    expiresAt: new Date()
  })

  const fetchCoupons = async () => {
    try {
      setIsLoading(true)
      const token = await getToken()
      const { data } = await axios.get('/api/admin/coupon', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setCoupons(data.coupons)
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddCoupon = async (e) => {
    e.preventDefault()
    try {
      const token = await getToken()
      newCoupon.discount = Number(newCoupon.discount)
      newCoupon.expiresAt = new Date(newCoupon.expiresAt)

      const { data } = await axios.post('/api/admin/coupon', { coupon: newCoupon }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success(data.message)
      setNewCoupon({ 
        code: '', 
        description: '', 
        discount: '', 
        forNewUser: false, 
        forMember: false, 
        expiresAt: new Date() 
      })
      await fetchCoupons()
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message)
    }
  }

  const handleChange = (e) => {
    setNewCoupon({ ...newCoupon, [e.target.name]: e.target.value })
  }

  const deleteCoupon = async (code) => {
    try {
      if (!window.confirm("Are you sure you want to delete this coupon?")) return
      const token = await getToken()
      await axios.delete(`/api/admin/coupon?code=${code}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      await fetchCoupons()
      toast.success("Coupon deleted successfully")
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message)
    }
  }

  useEffect(() => {
    fetchCoupons()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Coupon Management</h1>
          <p className="text-gray-600 mt-2">Create and manage discount coupons</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Coupon Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <PlusIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Create New Coupon</h2>
            </div>

            <form onSubmit={handleAddCoupon} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Coupon Code *
                  </label>
                  <input 
                    type="text" 
                    placeholder="SUMMER25" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    name="code" 
                    value={newCoupon.code} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Discount (%) *
                  </label>
                  <input 
                    type="number" 
                    placeholder="25" 
                    min={1} 
                    max={100} 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    name="discount" 
                    value={newCoupon.discount} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <input 
                  type="text" 
                  placeholder="Summer sale discount" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  name="description" 
                  value={newCoupon.description} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date
                </label>
                <input 
                  type="date" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  name="expiresAt" 
                  value={format(newCoupon.expiresAt, 'yyyy-MM-dd')} 
                  onChange={handleChange} 
                />
              </div>

              {/* Checkboxes - Only For New User and For Member */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition">
                  <input 
                    type="checkbox" 
                    name="forNewUser" 
                    checked={newCoupon.forNewUser} 
                    onChange={(e) => setNewCoupon({ ...newCoupon, forNewUser: e.target.checked })} 
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <UsersIcon className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">New Users Only</span>
                </label>

                <label className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition">
                  <input 
                    type="checkbox" 
                    name="forMember" 
                    checked={newCoupon.forMember} 
                    onChange={(e) => setNewCoupon({ ...newCoupon, forMember: e.target.checked })} 
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <UserCheckIcon className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">Members Only</span>
                </label>
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 active:scale-95 flex items-center justify-center gap-2"
              >
                <PlusIcon className="w-5 h-5" />
                Create Coupon
              </button>
            </form>
          </div>

          {/* Coupons List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <UsersIcon className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Active Coupons</h2>
              </div>
              <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                {coupons.length} total
              </span>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : coupons.length === 0 ? (
              <div className="text-center py-12">
                <UsersIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No coupons created yet</p>
                <p className="text-gray-400 text-sm mt-1">Create your first coupon to get started</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {coupons.map((coupon) => (
                  <div key={coupon.code} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                            {coupon.code}
                          </span>
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            {coupon.discount}% OFF
                          </span>
                        </div>
                        <p className="text-gray-700 mb-2">{coupon.description}</p>
                        <div className="flex flex-wrap gap-2 text-xs text-gray-500 mb-2">
                          <span>Expires: {format(new Date(coupon.expiresAt), 'MMM dd, yyyy')}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {coupon.forNewUser && (
                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                              <UsersIcon className="w-3 h-3" />
                              New Users
                            </span>
                          )}
                          {coupon.forMember && (
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                              <UserCheckIcon className="w-3 h-3" />
                              Members
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => deleteCoupon(coupon.code)}
                        className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                        title="Delete coupon"
                      >
                        <DeleteIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}