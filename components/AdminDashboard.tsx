"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, ImageIcon, Settings, BarChart3, LogOut } from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("products")

  const tabs = [
    { id: "products", name: "إدارة المنتجات", icon: Plus },
    { id: "news", name: "الشريط الإخباري", icon: BarChart3 },
    { id: "banner", name: "صور البانر", icon: ImageIcon },
    { id: "pages", name: "إدارة الصفحات", icon: Edit },
    { id: "settings", name: "الإعدادات", icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900 border-b border-yellow-400 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-yellow-400">لوحة إدارة متجر PUBG</h1>
          <button className="flex items-center text-white hover:text-yellow-400 transition-colors">
            <LogOut className="w-5 h-5 mr-2" />
            تسجيل الخروج
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="bg-gray-900 border border-yellow-400 rounded-lg p-4">
              <ul className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center p-3 rounded-lg transition-colors ${
                          activeTab === tab.id ? "bg-yellow-400 text-black" : "text-white hover:bg-gray-800"
                        }`}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {tab.name}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-gray-900 border border-yellow-400 rounded-lg p-6">
              {activeTab === "products" && <ProductsManager />}
              {activeTab === "news" && <NewsManager />}
              {activeTab === "banner" && <BannerManager />}
              {activeTab === "pages" && <PagesManager />}
              {activeTab === "settings" && <SettingsManager />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductsManager() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-yellow-400">إدارة المنتجات</h2>
        <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-500 transition-colors">
          <Plus className="w-5 h-5 inline mr-2" />
          إضافة منتج جديد
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-white">
          <thead>
            <tr className="border-b border-yellow-400">
              <th className="text-right p-3">اسم المنتج</th>
              <th className="text-right p-3">السعر</th>
              <th className="text-right p-3">الفئة</th>
              <th className="text-right p-3">الحالة</th>
              <th className="text-right p-3">الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-700">
              <td className="p-3">حساب كونكر مميز</td>
              <td className="p-3">$150</td>
              <td className="p-3">كونكر</td>
              <td className="p-3">
                <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">متاح</span>
              </td>
              <td className="p-3">
                <div className="flex space-x-2">
                  <button className="text-blue-400 hover:text-blue-300">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

function NewsManager() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-yellow-400">إدارة الشريط الإخباري</h2>
        <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-500 transition-colors">
          <Plus className="w-5 h-5 inline mr-2" />
          إضافة خبر جديد
        </button>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-white">🔥 عروض خاصة على حسابات الكونكر - خصم 20%</p>
            <div className="flex space-x-2">
              <button className="text-blue-400 hover:text-blue-300">
                <Edit className="w-4 h-4" />
              </button>
              <button className="text-red-400 hover:text-red-300">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BannerManager() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-yellow-400">إدارة صور البانر</h2>
        <button className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold hover:bg-yellow-500 transition-colors">
          <Plus className="w-5 h-5 inline mr-2" />
          إضافة صورة جديدة
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-800 p-4 rounded-lg">
            <div className="aspect-video bg-gray-700 rounded mb-3 flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-gray-400" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white">بانر {i}</span>
              <div className="flex space-x-2">
                <button className="text-blue-400 hover:text-blue-300">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-red-400 hover:text-red-300">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PagesManager() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">إدارة الصفحات</h2>
      <div className="space-y-4">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold">صفحة الشروط والأحكام</h3>
              <p className="text-gray-400 text-sm">آخر تحديث: منذ يومين</p>
            </div>
            <button className="text-blue-400 hover:text-blue-300">
              <Edit className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SettingsManager() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">إعدادات المتجر</h2>
      <div className="space-y-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-white font-bold mb-3">معلومات الاتصال</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-yellow-400 text-sm mb-1">رقم الواتساب</label>
              <input
                type="text"
                defaultValue="+967777826667"
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
              />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="text-white font-bold mb-3">إعدادات الموقع</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-yellow-400 text-sm mb-1">اسم المتجر</label>
              <input
                type="text"
                defaultValue="متجر حسابات PUBG Mobile"
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
              />
            </div>
          </div>
        </div>

        <button className="bg-yellow-400 text-black px-6 py-2 rounded-lg font-bold hover:bg-yellow-500 transition-colors">
          حفظ الإعدادات
        </button>
      </div>
    </div>
  )
}
