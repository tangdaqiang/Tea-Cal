"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalorieTable } from "@/components/calorie-table"
import { HotRankings } from "@/components/hot-rankings"
import { AiAssistant } from "@/components/ai-assistant"
import { ChevronDown, ChevronUp } from "lucide-react"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCalorieTableCollapsed, setIsCalorieTableCollapsed] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // 检查登录状态
    const currentUser = localStorage.getItem("currentUser")
    if (!currentUser) {
      router.push("/auth/login")
      return
    }
    setUser(JSON.parse(currentUser))
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    router.push("/auth/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#A8DADC] to-[#F8F9FA] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A8DADC] mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // 会被重定向到首页
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#A8DADC] to-[#F8F9FA]">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/dashboard" className="text-2xl font-bold text-gray-800">
                轻茶纪 <span className="text-sm font-normal text-gray-500">TeaCal</span>
              </Link>
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/calculator">
                  <Button variant="ghost">热量计算器</Button>
                </Link>
                <Link href="/my-records">
                  <Button variant="ghost">我的记录</Button>
                </Link>
                <Link href="/recommendations">
                  <Button variant="ghost">个性推荐</Button>
                </Link>
                <Link href="/health-tasks">
                  <Button variant="ghost">健康任务</Button>
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">欢迎，{user.username}</span>
              <Link href="/profile">
                <Button variant="outline" size="sm">
                  个人资料
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                退出登录
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">轻茶纪</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            你的健康奶茶顾问，也是懂你快乐的知己。科学拆解每一杯奶茶的热量，温柔引导健康选择。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/calculator">
              <Button size="lg" className="bg-[#A8DADC] hover:bg-[#96CED1] text-gray-800">
                开始计算热量
              </Button>
            </Link>
            <Link href="/recommendations">
              <Button variant="outline" size="lg">
                获取个性推荐
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Hot Rankings and Calorie Table */}
          <div className="lg:col-span-2">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">热门低卡奶茶排行榜</CardTitle>
                <CardDescription>每日更新，帮你找到美味与健康的平衡</CardDescription>
              </CardHeader>
              <CardContent>
                <HotRankings />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl text-gray-800">奶茶配料热量数据库</CardTitle>
                    <CardDescription>点击配料名称查看详细说明，调整用量实时计算热量</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsCalorieTableCollapsed(!isCalorieTableCollapsed)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {isCalorieTableCollapsed ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                  </Button>
                </div>
              </CardHeader>
              {!isCalorieTableCollapsed && (
                <CardContent>
                  <CalorieTable />
                </CardContent>
              )}
            </Card>
          </div>

          {/* Right Column - Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">快速功能</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/calculator" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    🧮 热量计算器
                  </Button>
                </Link>
                <Link href="/my-records" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    📝 我的记录
                  </Button>
                </Link>
                <Link href="/recommendations" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    ⭐ 个性推荐
                  </Button>
                </Link>
                <Link href="/health-tasks" className="block">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    🎯 健康任务
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-gray-800">今日小贴士</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 leading-relaxed">
                  💡 选择三分糖比全糖可以减少约60-80千卡热量，相当于少跑10分钟步！
                  用椰果替代珍珠，既有嚼劲又能减少近100千卡。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/50 border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 mb-4">
            数据基于专业营养成分研究及主流奶茶品牌配料分析，不同制作工艺可能存在 ±10% 误差
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <Link href="/about" className="hover:text-gray-700">
              关于我们
            </Link>
            <Link href="/privacy" className="hover:text-gray-700">
              隐私政策
            </Link>
            <Link href="/contact" className="hover:text-gray-700">
              联系我们
            </Link>
          </div>
        </div>
      </footer>

      {/* AI Assistant */}
      <AiAssistant />
    </div>
  )
}
