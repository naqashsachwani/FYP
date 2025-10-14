'use client'
import { dummyAdminDashboardData } from "@/assets/assets"
import Loading from "@/components/Loading"
import OrdersAreaChart from "@/components/OrdersAreaChart"
import axios from "axios"
import toast from "react-hot-toast"
import { useAuth } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { CircleDollarSignIcon, ShoppingBasketIcon, StoreIcon, TagsIcon, TrendingUp, Calendar, BarChart3, Download } from "lucide-react"

export default function AdminDashboard() {
  const { getToken } = useAuth()
  const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState({
    products: 0,
    revenue: 0,
    orders: 0,
    stores: 0,
    allOrders: [],
  })

  const dashboardCardsData = [
    { 
      title: 'Total Products', 
      value: dashboardData.products, 
      icon: ShoppingBasketIcon,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      trend: '+12%'
    },
    { 
      title: 'Total Revenue', 
      value: currency + dashboardData.revenue.toLocaleString(), 
      icon: CircleDollarSignIcon,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      trend: '+23%'
    },
    { 
      title: 'Total Orders', 
      value: dashboardData.orders, 
      icon: TagsIcon,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      trend: '+8%'
    },
    { 
      title: 'Total Stores', 
      value: dashboardData.stores, 
      icon: StoreIcon,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      trend: '+5%'
    },
  ]

  const fetchDashboardData = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get('/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setDashboardData(data.dashboardData)
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message)
      setDashboardData(dummyAdminDashboardData)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
  }, [])

  if (loading) return (
    <div className="flex items-center justify-center min-h-96">
      <Loading />
    </div>
  )

  return (
    <div className="space-y-6 mb-24">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Dream<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Saver</span> Dashboard
          </h1>
          <p className="text-slate-600 mt-2">Welcome to your admin dashboard</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-3 rounded-2xl border border-blue-100">
            <TrendingUp size={18} className="text-blue-600" />
            <span className="text-sm text-blue-700 font-medium">Real-time Analytics</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-white border border-slate-200 rounded-2xl text-slate-700 hover:bg-slate-50 transition-colors">
            <Calendar size={16} />
            <span className="text-sm font-medium">Last 30 Days</span>
          </button>
        </div>
      </div>

      {/* Dashboard Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {dashboardCardsData.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-slate-600 text-sm font-medium mb-1">{card.title}</p>
                <p className="text-3xl font-bold text-slate-800 mb-2">{card.value}</p>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium ${card.textColor}`}>{card.trend}</span>
                  <span className="text-slate-500 text-xs">vs last month</span>
                </div>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${card.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-md`}>
                <card.icon size={24} className="text-white" />
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
              <span>Performance</span>
              <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${card.color} rounded-full`}
                  style={{ width: `${Math.min(100, (index + 1) * 25)}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Orders Chart - Full Width */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-800">Order Analytics</h2>
            <p className="text-slate-600 text-sm">Overview of orders and revenue trends</p>
          </div>
          <div className="flex items-center gap-3 mt-3 sm:mt-0">
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg">
              <BarChart3 size={16} className="text-slate-600" />
              <span className="text-sm text-slate-700 font-medium">Live Data</span>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors">
              <Download size={16} />
              <span className="text-sm">Export</span>
            </button>
          </div>
        </div>
        <OrdersAreaChart allOrders={dashboardData.allOrders} />
      </div>
    </div>
  )
}