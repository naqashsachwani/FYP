'use client'
import { useEffect, useState } from "react"
import { format } from "date-fns"
import toast from "react-hot-toast"
import { Trash2 } from "lucide-react"
import { useAuth } from "@clerk/nextjs"
import axios from "axios"

export default function AdminCoupons() {
  const { getToken } = useAuth()
  const [coupons, setCoupons] = useState([])

  const [newCoupon, setNewCoupon] = useState({
    code: '',
    description: '',
    discount: '',
    forNewUser: false,
    forMember: false,
    isPublic: false,
    expiresAt: new Date()
  })

  const fetchCoupons = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get('/api/admin/coupon', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setCoupons(data.coupons)
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message)
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
      setNewCoupon({ code: '', description: '', discount: '', forNewUser: false, forMember: false, isPublic: false, expiresAt: new Date() })
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
    <div className="text-slate-600 mb-40 p-4 sm:p-8 bg-gradient-to-b from-slate-50 via-white to-slate-100 min-h-screen">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
          DreamSaver <span className="text-indigo-600">Coupons</span>
        </h1>
        <p className="text-slate-500 mt-2 text-sm sm:text-base">
          Manage promotional coupons easily and efficiently.
        </p>
      </div>

      {/* Add Coupon Form */}
      <form onSubmit={handleAddCoupon} className="max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 border border-slate-200 transition hover:shadow-xl">
        <h2 className="text-xl font-semibold text-slate-800 mb-4">
          Add New Coupon
        </h2>
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Coupon Code"
            className="p-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            name="code"
            value={newCoupon.code}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            placeholder="Discount (%)"
            min={1}
            max={100}
            className="p-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            name="discount"
            value={newCoupon.discount}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="p-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            name="description"
            value={newCoupon.description}
            onChange={handleChange}
            required
          />
          <label className="text-sm font-medium text-slate-600">
            Expiry Date
            <input
              type="date"
              className="p-3 mt-1 border border-slate-300 rounded-lg w-full outline-none focus:ring-2 focus:ring-indigo-500"
              name="expiresAt"
              value={format(newCoupon.expiresAt, 'yyyy-MM-dd')}
              onChange={handleChange}
            />
          </label>

          <div className="flex flex-col sm:flex-row gap-3 mt-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="forNewUser"
                checked={newCoupon.forNewUser}
                onChange={(e) =>
                  setNewCoupon({ ...newCoupon, forNewUser: e.target.checked })
                }
              />
              <span>For New Users</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="forMember"
                checked={newCoupon.forMember}
                onChange={(e) =>
                  setNewCoupon({ ...newCoupon, forMember: e.target.checked })
                }
              />
              <span>For Members</span>
            </label>
          </div>

          <button className="mt-5 w-full p-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md active:scale-95 transition-all">
            Add Coupon
          </button>
        </div>
      </form>

      {/* Coupons List */}
      <div className="mt-16 max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-slate-800 mb-4 text-center sm:text-left">
          Active Coupons
        </h2>
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-slate-200">
          <table className="min-w-full text-sm sm:text-base">
            <thead className="bg-indigo-50 text-slate-700">
              <tr>
                <th className="py-3 px-4 text-left font-semibold">Code</th>
                <th className="py-3 px-4 text-left font-semibold">Description</th>
                <th className="py-3 px-4 text-left font-semibold">Discount</th>
                <th className="py-3 px-4 text-left font-semibold">Expires</th>
                <th className="py-3 px-4 text-left font-semibold">New User</th>
                <th className="py-3 px-4 text-left font-semibold">Member</th>
                <th className="py-3 px-4 text-center font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-slate-400">
                    No coupons available yet.
                  </td>
                </tr>
              ) : (
                coupons.map((coupon) => (
                  <tr
                    key={coupon.code}
                    className="hover:bg-slate-50 transition duration-200"
                  >
                    <td className="py-3 px-4 font-medium text-slate-800">{coupon.code}</td>
                    <td className="py-3 px-4 text-slate-700">{coupon.description}</td>
                    <td className="py-3 px-4 text-slate-700">{coupon.discount}%</td>
                    <td className="py-3 px-4 text-slate-700">
                      {format(new Date(coupon.expiresAt), 'yyyy-MM-dd')}
                    </td>
                    <td className="py-3 px-4">{coupon.forNewUser ? "✅" : "❌"}</td>
                    <td className="py-3 px-4">{coupon.forMember ? "✅" : "❌"}</td>
                    <td className="py-3 px-4 text-center">
                      <Trash2
                        onClick={() => deleteCoupon(coupon.code)}
                        className="w-5 h-5 mx-auto text-red-500 hover:text-red-700 cursor-pointer transition"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
