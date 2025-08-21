"use client"

import { useState } from "react"
import { Plus, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RecordEntry from "@/components/record-entry"
import GrowthDashboard from "@/components/growth-dashboard"
import BudgetTracker from "@/components/budget-tracker"
import AchievementSystem from "@/components/achievement-system"

export default function MyRecordsPage() {
  const [showRecordEntry, setShowRecordEntry] = useState(false)

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-mint/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => (window.location.href = "/dashboard")}>
                ← 返回首页
              </Button>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-6 h-6 text-mint" />
                <h1 className="text-xl font-bold text-gray-800">我的奶茶记录</h1>
              </div>
            </div>
            <Button onClick={() => setShowRecordEntry(true)} className="bg-mint hover:bg-mint-dark text-white">
              <Plus className="w-4 h-4 mr-2" />
              记录奶茶
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">数据看板</TabsTrigger>
            <TabsTrigger value="records">记录历史</TabsTrigger>
            <TabsTrigger value="budget">预算管理</TabsTrigger>
            <TabsTrigger value="achievements">成长成就</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <GrowthDashboard />
          </TabsContent>

          <TabsContent value="records" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">记录历史</h2>
            </div>

            {/* Recent Records */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Mock recent records */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="border-mint/20">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">椰果奶茶</h3>
                        <p className="text-sm text-gray-500">喜茶 · 中杯 · 五分糖</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-mint-dark">156kcal</div>
                        <div className="text-xs text-gray-500">2024-01-{20 - i}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">开心</span>
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">低卡选择</span>
                    </div>
                    <img
                      src="/placeholder.svg?height=120&width=200"
                      alt="奶茶照片"
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <BudgetTracker />
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <AchievementSystem />
          </TabsContent>
        </Tabs>
      </div>

      {/* Record Entry Modal */}
      {showRecordEntry && <RecordEntry onClose={() => setShowRecordEntry(false)} />}
    </div>
  )
}
