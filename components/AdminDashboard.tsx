"use client"

import { useState } from "react"
import {
  Plus,
  Edit,
  Trash2,
  ImageIcon,
  Settings,
  BarChart3,
  LogOut,
  Users,
  Package,
  Eye,
  Search,
  Filter,
  Download,
  Upload,
  Save,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

interface Account {
  id: number
  title: string
  price: number
  category: string
  status: string
  views: number
  createdAt: string
  featured: boolean
  description?: string
}

interface User {
  id: number
  name: string
  email: string
  role: string
  status: string
  joinDate: string
}

interface NewsItem {
  id: number
  text: string
  active: boolean
  views: number
  createdAt: string
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const { toast } = useToast()

  // حالة البيانات
  const [accounts, setAccounts] = useState<Account[]>([
    {
      id: 1,
      title: "حساب كونكر مميز S1",
      price: 200,
      category: "conqueror",
      status: "available",
      views: 145,
      createdAt: "2024-01-15",
      featured: true,
      description: "حساب كونكر مميز مع أسلحة ذهبية",
    },
    {
      id: 2,
      title: "حساب مميز بدون كونكر P1",
      price: 120,
      category: "premium",
      status: "sold",
      views: 89,
      createdAt: "2024-01-10",
      featured: false,
      description: "حساب مميز بأسلحة نادرة",
    },
    {
      id: 3,
      title: "حساب متنوع V1",
      price: 60,
      category: "various",
      status: "pending",
      views: 67,
      createdAt: "2024-01-08",
      featured: false,
      description: "حساب متنوع للمبتدئين",
    },
  ])

  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "أحمد محمد", email: "ahmed@example.com", role: "مدير", status: "نشط", joinDate: "2024-01-15" },
    { id: 2, name: "فاطمة علي", email: "fatima@example.com", role: "محرر", status: "نشط", joinDate: "2024-01-10" },
    { id: 3, name: "محمد حسن", email: "mohamed@example.com", role: "مستخدم", status: "معلق", joinDate: "2024-01-08" },
  ])

  const [newsItems, setNewsItems] = useState<NewsItem[]>([
    { id: 1, text: "🔥 عروض خاصة على حسابات الكونكر - خصم 20%", active: true, views: 1250, createdAt: "2024-01-15" },
    { id: 2, text: "⭐ وصلت حسابات جديدة مع أسلحة ذهبية نادرة", active: true, views: 890, createdAt: "2024-01-14" },
    {
      id: 3,
      text: "🎮 متوفر الآن: حسابات مع رتبة الكونكر للموسم الحالي",
      active: false,
      views: 567,
      createdAt: "2024-01-13",
    },
  ])

  // حالة النوافذ المنبثقة
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isEditProductOpen, setIsEditProductOpen] = useState(false)
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isAddNewsOpen, setIsAddNewsOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Account | null>(null)

  // حالة النماذج
  const [productForm, setProductForm] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    featured: false,
  })

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    role: "",
  })

  const [newsForm, setNewsForm] = useState({
    text: "",
    active: true,
  })

  // إحصائيات محسوبة
  const stats = {
    totalAccounts: accounts.length,
    soldAccounts: accounts.filter((acc) => acc.status === "sold").length,
    activeUsers: users.filter((user) => user.status === "نشط").length,
    totalRevenue: accounts.filter((acc) => acc.status === "sold").reduce((sum, acc) => sum + acc.price, 0),
    pendingOrders: accounts.filter((acc) => acc.status === "pending").length,
    monthlyGrowth: 23.5,
  }

  // وظائف إدارة المنتجات
  const handleAddProduct = () => {
    if (!productForm.title || !productForm.price || !productForm.category) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      })
      return
    }

    const newProduct: Account = {
      id: Math.max(...accounts.map((a) => a.id)) + 1,
      title: productForm.title,
      price: Number.parseFloat(productForm.price),
      category: productForm.category,
      description: productForm.description,
      featured: productForm.featured,
      status: "available",
      views: 0,
      createdAt: new Date().toISOString().split("T")[0],
    }

    setAccounts([...accounts, newProduct])
    setProductForm({ title: "", price: "", category: "", description: "", featured: false })
    setIsAddProductOpen(false)

    toast({
      title: "تم بنجاح",
      description: "تم إضافة المنتج الجديد بنجاح",
    })
  }

  const handleEditProduct = (product: Account) => {
    setEditingProduct(product)
    setProductForm({
      title: product.title,
      price: product.price.toString(),
      category: product.category,
      description: product.description || "",
      featured: product.featured,
    })
    setIsEditProductOpen(true)
  }

  const handleUpdateProduct = () => {
    if (!editingProduct) return

    const updatedAccounts = accounts.map((acc) =>
      acc.id === editingProduct.id
        ? {
            ...acc,
            title: productForm.title,
            price: Number.parseFloat(productForm.price),
            category: productForm.category,
            description: productForm.description,
            featured: productForm.featured,
          }
        : acc,
    )

    setAccounts(updatedAccounts)
    setIsEditProductOpen(false)
    setEditingProduct(null)
    setProductForm({ title: "", price: "", category: "", description: "", featured: false })

    toast({
      title: "تم بنجاح",
      description: "تم تحديث المنتج بنجاح",
    })
  }

  const handleDeleteProduct = (id: number) => {
    setAccounts(accounts.filter((acc) => acc.id !== id))
    toast({
      title: "تم بنجاح",
      description: "تم حذف المنتج بنجاح",
    })
  }

  // وظائف إدارة المستخدمين
  const handleAddUser = () => {
    if (!userForm.name || !userForm.email || !userForm.role) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive",
      })
      return
    }

    const newUser: User = {
      id: Math.max(...users.map((u) => u.id)) + 1,
      name: userForm.name,
      email: userForm.email,
      role: userForm.role,
      status: "نشط",
      joinDate: new Date().toISOString().split("T")[0],
    }

    setUsers([...users, newUser])
    setUserForm({ name: "", email: "", role: "" })
    setIsAddUserOpen(false)

    toast({
      title: "تم بنجاح",
      description: "تم إضافة المستخدم الجديد بنجاح",
    })
  }

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id))
    toast({
      title: "تم بنجاح",
      description: "تم حذف المستخدم بنجاح",
    })
  }

  // وظائف إدارة الأخبار
  const handleAddNews = () => {
    if (!newsForm.text) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال نص الخبر",
        variant: "destructive",
      })
      return
    }

    const newNews: NewsItem = {
      id: Math.max(...newsItems.map((n) => n.id)) + 1,
      text: newsForm.text,
      active: newsForm.active,
      views: 0,
      createdAt: new Date().toISOString().split("T")[0],
    }

    setNewsItems([...newsItems, newNews])
    setNewsForm({ text: "", active: true })
    setIsAddNewsOpen(false)

    toast({
      title: "تم بنجاح",
      description: "تم إضافة الخبر الجديد بنجاح",
    })
  }

  const handleToggleNews = (id: number) => {
    setNewsItems(newsItems.map((news) => (news.id === id ? { ...news, active: !news.active } : news)))

    toast({
      title: "تم بنجاح",
      description: "تم تحديث حالة الخبر",
    })
  }

  const handleDeleteNews = (id: number) => {
    setNewsItems(newsItems.filter((news) => news.id !== id))
    toast({
      title: "تم بنجاح",
      description: "تم حذف الخبر بنجاح",
    })
  }

  // تصفية البيانات
  const filteredAccounts = accounts.filter((account) => {
    const matchesSearch = account.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || account.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "sold":
        return "bg-blue-500"
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "متاح"
      case "sold":
        return "مباع"
      case "pending":
        return "معلق"
      default:
        return "غير محدد"
    }
  }

  const getCategoryText = (category: string) => {
    switch (category) {
      case "conqueror":
        return "كونكر"
      case "premium":
        return "مميز"
      case "various":
        return "متنوع"
      default:
        return category
    }
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900 border-b border-yellow-400 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-yellow-400">لوحة إدارة متجر PUBG</h1>
            <p className="text-gray-400 text-sm">إدارة شاملة لمتجرك الإلكتروني</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="text-white border-gray-600 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              تصدير البيانات
            </Button>
            <Button className="flex items-center text-white hover:text-yellow-400 transition-colors">
              <LogOut className="w-5 h-5 mr-2" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation Tabs */}
          <TabsList className="grid w-full grid-cols-6 bg-gray-900 border border-yellow-400">
            <TabsTrigger value="overview" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              <BarChart3 className="w-4 h-4 mr-2" />
              نظرة عامة
            </TabsTrigger>
            <TabsTrigger value="products" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              <Package className="w-4 h-4 mr-2" />
              المنتجات
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              <Users className="w-4 h-4 mr-2" />
              المستخدمين
            </TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              <BarChart3 className="w-4 h-4 mr-2" />
              الأخبار
            </TabsTrigger>
            <TabsTrigger value="media" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              <ImageIcon className="w-4 h-4 mr-2" />
              الوسائط
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black">
              <Settings className="w-4 h-4 mr-2" />
              الإعدادات
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gray-900 border-yellow-400">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-yellow-400">إجمالي الحسابات</CardTitle>
                  <Package className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.totalAccounts}</div>
                  <p className="text-xs text-gray-400">+12% من الشهر الماضي</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-yellow-400">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-yellow-400">الحسابات المباعة</CardTitle>
                  <BarChart3 className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.soldAccounts}</div>
                  <p className="text-xs text-gray-400">+8% من الشهر الماضي</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-yellow-400">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-yellow-400">المستخدمين النشطين</CardTitle>
                  <Users className="h-4 w-4 text-yellow-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.activeUsers}</div>
                  <p className="text-xs text-gray-400">+15% من الشهر الماضي</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-yellow-400">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-yellow-400">إجمالي الإيرادات</CardTitle>
                  <div className="text-yellow-400">$</div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">${stats.totalRevenue}</div>
                  <p className="text-xs text-gray-400">+{stats.monthlyGrowth}% من الشهر الماضي</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="bg-gray-900 border-yellow-400">
              <CardHeader>
                <CardTitle className="text-yellow-400">النشاط الأخير</CardTitle>
                <CardDescription className="text-gray-400">آخر العمليات في المتجر</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "تم بيع حساب كونكر مميز", time: "منذ 5 دقائق", amount: "$200" },
                    { action: "تم إضافة حساب جديد", time: "منذ 15 دقيقة", amount: "" },
                    { action: "تم تحديث الأسعار", time: "منذ ساعة", amount: "" },
                    { action: "مستخدم جديد سجل", time: "منذ ساعتين", amount: "" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{activity.action}</p>
                        <p className="text-gray-400 text-sm">{activity.time}</p>
                      </div>
                      {activity.amount && <Badge className="bg-green-600 text-white">{activity.amount}</Badge>}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Products Tab */}
          <TabsContent value="products" className="space-y-6">
            <Card className="bg-gray-900 border-yellow-400">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-yellow-400">إدارة المنتجات</CardTitle>
                    <CardDescription className="text-gray-400">إدارة حسابات PUBG المتاحة للبيع</CardDescription>
                  </div>
                  <Button
                    onClick={() => setIsAddProductOpen(true)}
                    className="bg-yellow-400 text-black hover:bg-yellow-500"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    إضافة منتج جديد
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Search and Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="البحث في المنتجات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-gray-800 border-gray-600 text-white"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-48 bg-gray-800 border-gray-600">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-600">
                      <SelectItem value="all">جميع الحالات</SelectItem>
                      <SelectItem value="available">متاح</SelectItem>
                      <SelectItem value="sold">مباع</SelectItem>
                      <SelectItem value="pending">معلق</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Products Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-white">
                    <thead>
                      <tr className="border-b border-yellow-400">
                        <th className="text-right p-3 text-yellow-400">المنتج</th>
                        <th className="text-right p-3 text-yellow-400">السعر</th>
                        <th className="text-right p-3 text-yellow-400">الفئة</th>
                        <th className="text-right p-3 text-yellow-400">الحالة</th>
                        <th className="text-right p-3 text-yellow-400">المشاهدات</th>
                        <th className="text-right p-3 text-yellow-400">تاريخ الإضافة</th>
                        <th className="text-right p-3 text-yellow-400">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAccounts.map((account) => (
                        <tr key={account.id} className="border-b border-gray-700 hover:bg-gray-800">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <div>
                                <p className="font-medium">{account.title}</p>
                                {account.featured && <Badge className="bg-yellow-400 text-black text-xs">مميز</Badge>}
                              </div>
                            </div>
                          </td>
                          <td className="p-3 font-bold text-green-400">${account.price}</td>
                          <td className="p-3">
                            <Badge variant="outline" className="border-gray-600">
                              {getCategoryText(account.category)}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${getStatusColor(account.status)}`}></div>
                              <span>{getStatusText(account.status)}</span>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4 text-gray-400" />
                              {account.views}
                            </div>
                          </td>
                          <td className="p-3 text-gray-400">{account.createdAt}</td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditProduct(account)}
                                className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white bg-transparent"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteProduct(account.id)}
                                className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="bg-gray-900 border-yellow-400">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-yellow-400">إدارة المستخدمين</CardTitle>
                    <CardDescription className="text-gray-400">إدارة حسابات المستخدمين والصلاحيات</CardDescription>
                  </div>
                  <Button
                    onClick={() => setIsAddUserOpen(true)}
                    className="bg-yellow-400 text-black hover:bg-yellow-500"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    إضافة مستخدم
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-black font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-gray-400 text-sm">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="border-gray-600">
                          {user.role}
                        </Badge>
                        <Badge className={user.status === "نشط" ? "bg-green-600" : "bg-yellow-600"}>
                          {user.status}
                        </Badge>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="border-blue-600 text-blue-400 bg-transparent">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteUser(user.id)}
                            className="border-red-600 text-red-400 bg-transparent"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* News Tab */}
          <TabsContent value="news" className="space-y-6">
            <Card className="bg-gray-900 border-yellow-400">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-yellow-400">إدارة الشريط الإخباري</CardTitle>
                    <CardDescription className="text-gray-400">إدارة الأخبار والإعلانات المتحركة</CardDescription>
                  </div>
                  <Button
                    onClick={() => setIsAddNewsOpen(true)}
                    className="bg-yellow-400 text-black hover:bg-yellow-500"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    إضافة خبر جديد
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {newsItems.map((news) => (
                    <div key={news.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex-1">
                        <p className="text-white">{news.text}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <Badge className={news.active ? "bg-green-600" : "bg-gray-600"}>
                            {news.active ? "نشط" : "معطل"}
                          </Badge>
                          <span className="text-gray-400 text-sm flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {news.views} مشاهدة
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleToggleNews(news.id)}
                          className="border-green-600 text-green-400 bg-transparent"
                        >
                          {news.active ? "إيقاف" : "تفعيل"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteNews(news.id)}
                          className="border-red-600 text-red-400 bg-transparent"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Media Tab */}
          <TabsContent value="media" className="space-y-6">
            <Card className="bg-gray-900 border-yellow-400">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-yellow-400">إدارة الوسائط</CardTitle>
                    <CardDescription className="text-gray-400">إدارة الصور والفيديوهات</CardDescription>
                  </div>
                  <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
                    <Upload className="w-4 h-4 mr-2" />
                    رفع ملفات جديدة
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div key={i} className="bg-gray-800 rounded-lg overflow-hidden">
                      <div className="aspect-video bg-gray-700 flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="p-3">
                        <p className="text-white text-sm font-medium">صورة {i}</p>
                        <p className="text-gray-400 text-xs">تم الرفع: 2024-01-{10 + i}</p>
                        <div className="flex justify-between items-center mt-2">
                          <Badge variant="outline" className="border-gray-600 text-xs">
                            JPG
                          </Badge>
                          <div className="flex gap-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-blue-600 text-blue-400 h-6 w-6 p-0 bg-transparent"
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-600 text-red-400 h-6 w-6 p-0 bg-transparent"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="space-y-6">
              <Card className="bg-gray-900 border-yellow-400">
                <CardHeader>
                  <CardTitle className="text-yellow-400">إعدادات المتجر العامة</CardTitle>
                  <CardDescription className="text-gray-400">إعدادات أساسية للمتجر</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label className="text-yellow-400">اسم المتجر</Label>
                        <Input defaultValue="متجر حسابات PUBG Mobile" className="bg-gray-800 border-gray-600" />
                      </div>
                      <div>
                        <Label className="text-yellow-400">وصف المتجر</Label>
                        <Textarea
                          defaultValue="أفضل متجر لبيع حسابات PUBG Mobile المميزة"
                          className="bg-gray-800 border-gray-600"
                        />
                      </div>
                      <div>
                        <Label className="text-yellow-400">رقم الواتساب</Label>
                        <Input defaultValue="+967777826667" className="bg-gray-800 border-gray-600" />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-yellow-400">عملة المتجر</Label>
                        <Select defaultValue="usd">
                          <SelectTrigger className="bg-gray-800 border-gray-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            <SelectItem value="usd">دولار أمريكي (USD)</SelectItem>
                            <SelectItem value="eur">يورو (EUR)</SelectItem>
                            <SelectItem value="sar">ريال سعودي (SAR)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-yellow-400">المنطقة الزمنية</Label>
                        <Select defaultValue="asia/riyadh">
                          <SelectTrigger className="bg-gray-800 border-gray-600">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            <SelectItem value="asia/riyadh">الرياض</SelectItem>
                            <SelectItem value="asia/dubai">دبي</SelectItem>
                            <SelectItem value="africa/cairo">القاهرة</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label className="text-yellow-400">تفعيل الوضع المظلم</Label>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-yellow-400">
                <CardHeader>
                  <CardTitle className="text-yellow-400">إعدادات الأمان</CardTitle>
                  <CardDescription className="text-gray-400">إعدادات الحماية والأمان</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-yellow-400">المصادقة الثنائية</Label>
                      <p className="text-gray-400 text-sm">تفعيل المصادقة الثنائية لحماية إضافية</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-yellow-400">تسجيل العمليات</Label>
                      <p className="text-gray-400 text-sm">حفظ سجل بجميع العمليات المهمة</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-yellow-400">إشعارات البريد الإلكتروني</Label>
                      <p className="text-gray-400 text-sm">إرسال إشعارات عند حدوث عمليات مهمة</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button className="bg-yellow-400 text-black hover:bg-yellow-500">حفظ جميع الإعدادات</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Product Dialog */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="bg-gray-900 border-yellow-400 text-white">
          <DialogHeader>
            <DialogTitle className="text-yellow-400">إضافة منتج جديد</DialogTitle>
            <DialogDescription className="text-gray-400">أضف حساب PUBG جديد للمتجر</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right text-yellow-400">
                العنوان
              </Label>
              <Input
                id="title"
                value={productForm.title}
                onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                className="col-span-3 bg-gray-800 border-gray-600"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right text-yellow-400">
                السعر
              </Label>
              <Input
                id="price"
                type="number"
                value={productForm.price}
                onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                className="col-span-3 bg-gray-800 border-gray-600"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right text-yellow-400">
                الفئة
              </Label>
              <Select
                value={productForm.category}
                onValueChange={(value) => setProductForm({ ...productForm, category: value })}
              >
                <SelectTrigger className="col-span-3 bg-gray-800 border-gray-600">
                  <SelectValue placeholder="اختر الفئة" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="conqueror">كونكر</SelectItem>
                  <SelectItem value="premium">مميز</SelectItem>
                  <SelectItem value="various">متنوع</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right text-yellow-400">
                الوصف
              </Label>
              <Textarea
                id="description"
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                className="col-span-3 bg-gray-800 border-gray-600"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={productForm.featured}
                onCheckedChange={(checked) => setProductForm({ ...productForm, featured: checked })}
              />
              <Label htmlFor="featured" className="text-yellow-400">
                منتج مميز
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddProduct} className="bg-yellow-400 text-black hover:bg-yellow-500">
              <Save className="w-4 h-4 mr-2" />
              حفظ المنتج
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
        <DialogContent className="bg-gray-900 border-yellow-400 text-white">
          <DialogHeader>
            <DialogTitle className="text-yellow-400">تعديل المنتج</DialogTitle>
            <DialogDescription className="text-gray-400">تعديل بيانات المنتج</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-title" className="text-right text-yellow-400">
                العنوان
              </Label>
              <Input
                id="edit-title"
                value={productForm.title}
                onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                className="col-span-3 bg-gray-800 border-gray-600"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-price" className="text-right text-yellow-400">
                السعر
              </Label>
              <Input
                id="edit-price"
                type="number"
                value={productForm.price}
                onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                className="col-span-3 bg-gray-800 border-gray-600"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-category" className="text-right text-yellow-400">
                الفئة
              </Label>
              <Select
                value={productForm.category}
                onValueChange={(value) => setProductForm({ ...productForm, category: value })}
              >
                <SelectTrigger className="col-span-3 bg-gray-800 border-gray-600">
                  <SelectValue placeholder="اختر الفئة" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="conqueror">كونكر</SelectItem>
                  <SelectItem value="premium">مميز</SelectItem>
                  <SelectItem value="various">متنوع</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-description" className="text-right text-yellow-400">
                الوصف
              </Label>
              <Textarea
                id="edit-description"
                value={productForm.description}
                onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                className="col-span-3 bg-gray-800 border-gray-600"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="edit-featured"
                checked={productForm.featured}
                onCheckedChange={(checked) => setProductForm({ ...productForm, featured: checked })}
              />
              <Label htmlFor="edit-featured" className="text-yellow-400">
                منتج مميز
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleUpdateProduct} className="bg-yellow-400 text-black hover:bg-yellow-500">
              <Save className="w-4 h-4 mr-2" />
              حفظ التغييرات
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="bg-gray-900 border-yellow-400 text-white">
          <DialogHeader>
            <DialogTitle className="text-yellow-400">إضافة مستخدم جديد</DialogTitle>
            <DialogDescription className="text-gray-400">إضافة مستخدم جديد للنظام</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="user-name" className="text-right text-yellow-400">
                الاسم
              </Label>
              <Input
                id="user-name"
                value={userForm.name}
                onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                className="col-span-3 bg-gray-800 border-gray-600"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="user-email" className="text-right text-yellow-400">
                البريد الإلكتروني
              </Label>
              <Input
                id="user-email"
                type="email"
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                className="col-span-3 bg-gray-800 border-gray-600"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="user-role" className="text-right text-yellow-400">
                الدور
              </Label>
              <Select value={userForm.role} onValueChange={(value) => setUserForm({ ...userForm, role: value })}>
                <SelectTrigger className="col-span-3 bg-gray-800 border-gray-600">
                  <SelectValue placeholder="اختر الدور" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="مدير">مدير</SelectItem>
                  <SelectItem value="محرر">محرر</SelectItem>
                  <SelectItem value="مستخدم">مستخدم</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddUser} className="bg-yellow-400 text-black hover:bg-yellow-500">
              <Save className="w-4 h-4 mr-2" />
              إضافة المستخدم
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add News Dialog */}
      <Dialog open={isAddNewsOpen} onOpenChange={setIsAddNewsOpen}>
        <DialogContent className="bg-gray-900 border-yellow-400 text-white">
          <DialogHeader>
            <DialogTitle className="text-yellow-400">إضافة خبر جديد</DialogTitle>
            <DialogDescription className="text-gray-400">إضافة خبر جديد للشريط الإخباري</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="news-text" className="text-right text-yellow-400">
                نص الخبر
              </Label>
              <Textarea
                id="news-text"
                value={newsForm.text}
                onChange={(e) => setNewsForm({ ...newsForm, text: e.target.value })}
                className="col-span-3 bg-gray-800 border-gray-600"
                placeholder="أدخل نص الخبر..."
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="news-active"
                checked={newsForm.active}
                onCheckedChange={(checked) => setNewsForm({ ...newsForm, active: checked })}
              />
              <Label htmlFor="news-active" className="text-yellow-400">
                نشط
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleAddNews} className="bg-yellow-400 text-black hover:bg-yellow-500">
              <Save className="w-4 h-4 mr-2" />
              إضافة الخبر
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
