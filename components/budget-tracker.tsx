"use client"

import { useState } from "react"
import { Target, AlertTriangle, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function BudgetTracker() {
  const [dailyBudget, setDailyBudget] = useState(300)
  const [weeklyBudget, setWeeklyBudget] = useState(1500)

  // Mock current consumption
  const todayConsumed = 285
  const weekConsumed = 1680

  const dailyProgress = (todayConsumed / dailyBudget) * 100
  const weeklyProgress = (weekConsumed / weeklyBudget) * 100

  const dailyRemaining = dailyBudget - todayConsumed
  const weeklyRemaining = weeklyBudget - weekConsumed

  const isOverDailyBudget = todayConsumed > dailyBudget
  const isOverWeeklyBudget = weekConsumed > weeklyBudget

  return (
    <div className="space-y-6">
      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily Budget */}
        <Card className={`border-2 ${isOverDailyBudget ? "border-red-200 bg-red-50" : "border-mint/20"}`}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Target className="w-5 h-5 text-mint mr-2" />
              今日预算
            </CardTitle>
            <CardDescription>
              {isOverDailyBudget ? "今天额度已超支" : `还剩 ${dailyRemaining}kcal 可以享用`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-mint-dark">{todayConsumed}</span>
              <span className="text-sm text-gray-500">/ {dailyBudget} kcal</span>
            </div>

            <Progress
              value={Math.min(dailyProgress, 100)}
              className={`h-3 ${isOverDailyBudget ? "[&>div]:bg-red-500" : "[&>div]:bg-mint"}`}
            />

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">使用率</span>
              <span className={`font-medium ${isOverDailyBudget ? "text-red-600" : "text-mint-dark"}`}>
                {Math.round(dailyProgress)}%
              </span>
            </div>

            {isOverDailyBudget && (
              <div className="bg-red-100 p-3 rounded-lg flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                <div className="text-sm text-red-800">
                  <p className="font-medium">今天额度快用完啦～</p>
                  <p>明天再喝更合适哦，或者选择无糖茶饮</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Weekly Budget */}
        <Card className={`border-2 ${isOverWeeklyBudget ? "border-red-200 bg-red-50" : "border-mint/20"}`}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Calendar className="w-5 h-5 text-mint mr-2" />
              本周预算
            </CardTitle>
            <CardDescription>
              {isOverWeeklyBudget ? "本周预算已超支" : `还剩 ${Math.abs(weeklyRemaining)}kcal`}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-mint-dark">{weekConsumed}</span>
              <span className="text-sm text-gray-500">/ {weeklyBudget} kcal</span>
            </div>

            <Progress
              value={Math.min(weeklyProgress, 100)}
              className={`h-3 ${isOverWeeklyBudget ? "[&>div]:bg-red-500" : "[&>div]:bg-mint"}`}
            />

            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">使用率</span>
              <span className={`font-medium ${isOverWeeklyBudget ? "text-red-600" : "text-mint-dark"}`}>
                {Math.round(weeklyProgress)}%
              </span>
            </div>

            {isOverWeeklyBudget && (
              <div className="bg-red-100 p-3 rounded-lg flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                <div className="text-sm text-red-800">
                  <p className="font-medium">本周预算已超支 {Math.abs(weeklyRemaining)}kcal</p>
                  <p>建议接下来几天选择低卡奶茶</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Budget History */}
      <Card className="border-mint/20">
        <CardHeader>
          <CardTitle className="text-lg">预算使用历史</CardTitle>
          <CardDescription>过去7天的预算使用情况</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: "今天", consumed: 285, budget: 300, status: "good" },
              { date: "昨天", consumed: 320, budget: 300, status: "over" },
              { date: "1/19", consumed: 180, budget: 300, status: "excellent" },
              { date: "1/18", consumed: 450, budget: 300, status: "over" },
              { date: "1/17", consumed: 220, budget: 300, status: "good" },
              { date: "1/16", consumed: 285, budget: 300, status: "good" },
              { date: "1/15", consumed: 140, budget: 300, status: "excellent" },
            ].map((day, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-sm w-12">{day.date}</span>
                  <div className="flex-1">
                    <Progress
                      value={(day.consumed / day.budget) * 100}
                      className={`h-2 w-32 ${
                        day.status === "excellent"
                          ? "[&>div]:bg-green-500"
                          : day.status === "good"
                            ? "[&>div]:bg-mint"
                            : "[&>div]:bg-red-500"
                      }`}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-mono">{day.consumed}kcal</span>
                  <Badge
                    className={
                      day.status === "excellent"
                        ? "bg-green-100 text-green-800"
                        : day.status === "good"
                          ? "bg-mint/20 text-mint-dark"
                          : "bg-red-100 text-red-800"
                    }
                  >
                    {day.status === "excellent" ? "优秀" : day.status === "good" ? "良好" : "超支"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Budget Settings */}
      <Card className="border-mint/20">
        <CardHeader>
          <CardTitle className="text-lg">预算设置</CardTitle>
          <CardDescription>调整你的每日和每周热量预算</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">每日预算 (kcal)</label>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setDailyBudget(Math.max(100, dailyBudget - 50))}
                  className="border-mint/30 bg-transparent"
                >
                  -50
                </Button>
                <span className="font-mono text-lg px-4">{dailyBudget}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setDailyBudget(dailyBudget + 50)}
                  className="border-mint/30 bg-transparent"
                >
                  +50
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">每周预算 (kcal)</label>
              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setWeeklyBudget(Math.max(500, weeklyBudget - 200))}
                  className="border-mint/30 bg-transparent"
                >
                  -200
                </Button>
                <span className="font-mono text-lg px-4">{weeklyBudget}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setWeeklyBudget(weeklyBudget + 200)}
                  className="border-mint/30 bg-transparent"
                >
                  +200
                </Button>
              </div>
            </div>
          </div>
          <Button className="bg-mint hover:bg-mint-dark text-white">保存设置</Button>
        </CardContent>
      </Card>
    </div>
  )
}
