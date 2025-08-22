"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RecordEntry from "@/components/record-entry"
import BudgetTracker from "@/components/budget-tracker"

export default function MyRecordsPage() {
  const router = useRouter()
  const [showRecordEntry, setShowRecordEntry] = useState(false)
  const [records, setRecords] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // 辅助函数：格式化日期
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // 辅助函数：获取心情标签
  const getMoodLabel = (moodKey: string) => {
    const moods = {
      happy: '开心',
      relaxed: '放松',
      conflicted: '纠结',
      celebrating: '庆祝'
    }
    return moods[moodKey as keyof typeof moods] || moodKey
  }

  // 加载记录
  useEffect(() => {
    const loadRecords = () => {
      try {
        const savedRecords = localStorage.getItem('milkTeaRecords')
        if (savedRecords) {
          setRecords(JSON.parse(savedRecords))
        }
      } catch (error) {
        console.error('Failed to load records:', error)
      }
      setLoading(false)
    }

    loadRecords()
  }, [])

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-mint/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.push('/dashboard')}>
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
        <Tabs defaultValue="records" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="dashboard">数据看板</TabsTrigger>
            <TabsTrigger value="records">记录历史</TabsTrigger>
            <TabsTrigger value="budget">预算管理</TabsTrigger>
          </TabsList>

          <TabsContent value="records" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">记录历史</h2>
            </div>

            {/* Recent Records */}
            {loading ? (
              <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-lg">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-mint"></div>
              </div>
            ) : records.length === 0 ? (
              <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-200 rounded-lg">
                <div className="text-center">
                  <p className="text-gray-500 mb-4">暂无奶茶记录</p>
                  <Button onClick={() => setShowRecordEntry(true)} className="bg-mint hover:bg-mint-dark text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    立即记录
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {records
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                  .map((record) => (
                    <Card key={record.id} className="border-mint/20 hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-lg">{record.drink.name}</h4>
                            {record.drink.brand && (
                              <p className="text-sm text-gray-500 mb-1">品牌: {record.drink.brand}</p>
                            )}
                            <div className="flex items-center mt-2 space-x-2">
                              <span className="px-2 py-1 bg-mint/10 text-mint-dark text-xs rounded-full font-medium">
                                {record.drink.calories}kcal
                              </span>
                              {record.mood && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full font-medium">
                                  {getMoodLabel(record.mood)}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">
                              {formatDate(record.timestamp)}
                            </p>
                          </div>
                        </div>
                        {record.notes && (
                          <div className="mt-3 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                            {record.notes}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <BudgetTracker />
          </TabsContent>

        </Tabs>
      </div>

      {/* Record Entry Modal */}
      {showRecordEntry && <RecordEntry onClose={() => setShowRecordEntry(false)} />}
    </div>
  )
}
