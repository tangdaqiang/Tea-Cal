"use client"

import { useState } from "react"
import { TrendingUp, TrendingDown, Calendar, Award, Heart, Zap } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

export default function GrowthDashboard() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter">("week")

  // Mock data
  const weeklyData = [
    { date: "1/15", calories: 320, lowCal: true },
    { date: "1/16", calories: 285, lowCal: true },
    { date: "1/17", calories: 450, lowCal: false },
    { date: "1/18", calories: 180, lowCal: true },
    { date: "1/19", calories: 220, lowCal: true },
    { date: "1/20", calories: 380, lowCal: false },
    { date: "1/21", calories: 156, lowCal: true },
  ]

  const categoryData = [
    { name: "低卡选择", value: 68, color: "#A8DADC" },
    { name: "中卡选择", value: 22, color: "#F4A261" },
    { name: "高卡选择", value: 10, color: "#E76F51" },
  ]

  const currentWeekAvg = Math.round(weeklyData.reduce((sum, day) => sum + day.calories, 0) / weeklyData.length)
  const lastWeekAvg = 310 // Mock last week average
  const improvement = Math.round(((lastWeekAvg - currentWeekAvg) / lastWeekAvg) * 100)

  const achievements = [
    { id: 1, title: "低卡达人", description: "连续7天选择低卡奶茶", completed: true, icon: "🏆" },
    { id: 2, title: "记录小能手", description: "连续记录14天", completed: true, icon: "📝" },
    { id: 3, title: "健康选择", description: "本月低卡选择占比超过60%", completed: false, icon: "💚" },
  ]

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-mint/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">本周平均热量</p>
                <p className="text-2xl font-bold text-mint-dark">{currentWeekAvg}</p>
                <p className="text-xs text-gray-500">kcal/天</p>
              </div>
              <div className="w-12 h-12 bg-mint/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-mint" />
              </div>
            </div>
            {improvement > 0 && (
              <div className="mt-2 flex items-center text-green-600">
                <TrendingDown className="w-3 h-3 mr-1" />
                <span className="text-xs">比上周降低 {improvement}%</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-mint/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">低卡选择占比</p>
                <p className="text-2xl font-bold text-mint-dark">68%</p>
                <p className="text-xs text-gray-500">本周</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              <span className="text-xs">比上周提升 12%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-mint/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">连续记录</p>
                <p className="text-2xl font-bold text-mint-dark">14</p>
                <p className="text-xs text-gray-500">天</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-2 text-xs text-blue-600">距离月度目标还差 16 天</div>
          </CardContent>
        </Card>

        <Card className="border-mint/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">获得成就</p>
                <p className="text-2xl font-bold text-mint-dark">8</p>
                <p className="text-xs text-gray-500">个</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-2 text-xs text-yellow-600">本月新增 3 个成就</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calorie Trend */}
        <Card className="border-mint/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">热量趋势</CardTitle>
                <CardDescription>每日热量摄入变化</CardDescription>
              </div>
              <div className="flex space-x-1">
                {["week", "month", "quarter"].map((range) => (
                  <Button
                    key={range}
                    size="sm"
                    variant={timeRange === range ? "default" : "ghost"}
                    className={timeRange === range ? "bg-mint text-white" : "text-gray-600"}
                    onClick={() => setTimeRange(range as any)}
                  >
                    {range === "week" ? "周" : range === "month" ? "月" : "季"}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip formatter={(value) => [`${value} kcal`, "热量"]} labelStyle={{ color: "#666" }} />
                  <Line
                    type="monotone"
                    dataKey="calories"
                    stroke="#A8DADC"
                    strokeWidth={3}
                    dot={{ fill: "#A8DADC", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card className="border-mint/20">
          <CardHeader>
            <CardTitle className="text-lg">选择分布</CardTitle>
            <CardDescription>本周热量选择类型分析</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "占比"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Positive Feedback */}
      <Card className="border-mint/20 bg-mint/5">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Zap className="w-5 h-5 text-mint mr-2" />
            本周小总结
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-mint-dark mb-2">太棒了，你在慢慢找到平衡～</h4>
              <p className="text-sm text-gray-600 mb-3">
                这周你的平均热量是 {currentWeekAvg}kcal，比上周降低了 {improvement}%！ 你今天选的'五分糖 +
                椰果'比全糖珍珠省了 90kcal，相当于少跑 15 分钟步，太会选了！
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-green-100 text-green-800">低卡选择 +12%</Badge>
                <Badge className="bg-blue-100 text-blue-800">连续记录 14天</Badge>
                <Badge className="bg-purple-100 text-purple-800">新解锁成就 3个</Badge>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold text-mint-dark mb-2">健康小知识</h4>
              <p className="text-sm text-gray-600">
                你这周省下的热量，相当于 2.5 碗白米饭的热量！继续保持这样的选择， 一个月下来能省下相当于 10
                碗米饭的热量呢～
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <Card className="border-mint/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Award className="w-5 h-5 text-mint mr-2" />
            最新成就
          </CardTitle>
          <CardDescription>你的奶茶管理成就展示</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border-2 ${
                  achievement.completed ? "border-mint bg-mint/10" : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{achievement.icon}</div>
                  <h4 className="font-semibold mb-1">{achievement.title}</h4>
                  <p className="text-xs text-gray-600">{achievement.description}</p>
                  {achievement.completed && <Badge className="mt-2 bg-mint text-white">已完成</Badge>}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
