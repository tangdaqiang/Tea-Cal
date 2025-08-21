"use client"

import { useState } from "react"
import { Award, Star, Target, Calendar, Heart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: "record" | "health" | "social" | "milestone"
  completed: boolean
  progress?: number
  maxProgress?: number
  reward: string
  completedDate?: string
}

export default function AchievementSystem() {
  const [activeCategory, setActiveCategory] = useState<"all" | "record" | "health" | "social" | "milestone">("all")

  const achievements: Achievement[] = [
    {
      id: "1",
      title: "记录新手",
      description: "完成第一次奶茶记录",
      icon: "📝",
      category: "record",
      completed: true,
      reward: "奶茶贴纸 x1",
      completedDate: "2024-01-15",
    },
    {
      id: "2",
      title: "连续记录7天",
      description: "连续7天记录奶茶摄入",
      icon: "🔥",
      category: "record",
      completed: true,
      reward: "专属称号：记录达人",
      completedDate: "2024-01-21",
    },
    {
      id: "3",
      title: "低卡选择者",
      description: "单周低卡选择占比超过60%",
      icon: "💚",
      category: "health",
      completed: true,
      reward: "健康徽章",
      completedDate: "2024-01-20",
    },
    {
      id: "4",
      title: "热量控制大师",
      description: "连续14天保持在预算范围内",
      icon: "🎯",
      category: "health",
      completed: false,
      progress: 8,
      maxProgress: 14,
      reward: "专属称号：控制大师",
    },
    {
      id: "5",
      title: "分享达人",
      description: "分享奶茶日记到社交平台5次",
      icon: "📱",
      category: "social",
      completed: false,
      progress: 2,
      maxProgress: 5,
      reward: "分享专属贴纸包",
    },
    {
      id: "6",
      title: "月度坚持",
      description: "连续记录30天",
      icon: "🏆",
      category: "milestone",
      completed: false,
      progress: 14,
      maxProgress: 30,
      reward: "月度成就证书",
    },
    {
      id: "7",
      title: "品牌探索家",
      description: "尝试记录10个不同品牌的奶茶",
      icon: "🌟",
      category: "milestone",
      completed: false,
      progress: 6,
      maxProgress: 10,
      reward: "探索者徽章",
    },
    {
      id: "8",
      title: "健康转变",
      description: "平均热量比第一周降低20%",
      icon: "📈",
      category: "health",
      completed: true,
      reward: "转变成就徽章",
      completedDate: "2024-01-18",
    },
  ]

  const categories = [
    { key: "all", label: "全部", icon: <Award className="w-4 h-4" /> },
    { key: "record", label: "记录", icon: <Calendar className="w-4 h-4" /> },
    { key: "health", label: "健康", icon: <Heart className="w-4 h-4" /> },
    { key: "social", label: "社交", icon: <Star className="w-4 h-4" /> },
    { key: "milestone", label: "里程碑", icon: <Target className="w-4 h-4" /> },
  ]

  const filteredAchievements =
    activeCategory === "all" ? achievements : achievements.filter((a) => a.category === activeCategory)

  const completedCount = achievements.filter((a) => a.completed).length
  const totalCount = achievements.length

  const weeklyGoals = [
    { id: 1, title: "记录5天奶茶", progress: 3, max: 5, reward: "奶茶贴纸" },
    { id: 2, title: "低卡选择3次", progress: 2, max: 3, reward: "健康徽章" },
    { id: 3, title: "尝试新品牌", progress: 0, max: 1, reward: "探索贴纸" },
  ]

  return (
    <div className="space-y-6">
      {/* Achievement Overview */}
      <Card className="border-mint/20 bg-mint/5">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Award className="w-6 h-6 text-mint mr-2" />
            成就总览
          </CardTitle>
          <CardDescription>你的奶茶管理成就展示</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-mint-dark">{completedCount}</div>
              <div className="text-sm text-gray-600">已完成成就</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-mint-dark">
                {Math.round((completedCount / totalCount) * 100)}%
              </div>
              <div className="text-sm text-gray-600">完成率</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-mint-dark">14</div>
              <div className="text-sm text-gray-600">连续记录天数</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Goals */}
      <Card className="border-mint/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Target className="w-5 h-5 text-mint mr-2" />
            本周小目标
          </CardTitle>
          <CardDescription>完成小目标，解锁奶茶贴纸</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyGoals.map((goal) => (
              <div key={goal.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{goal.title}</h4>
                  <Badge className="bg-mint/20 text-mint-dark">{goal.reward}</Badge>
                </div>
                <div className="flex items-center space-x-3">
                  <Progress value={(goal.progress / goal.max) * 100} className="flex-1 h-2" />
                  <span className="text-sm font-mono">
                    {goal.progress}/{goal.max}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.key}
            size="sm"
            variant={activeCategory === category.key ? "default" : "outline"}
            className={
              activeCategory === category.key
                ? "bg-mint text-white"
                : "border-mint/30 text-mint hover:bg-mint/5 bg-transparent"
            }
            onClick={() => setActiveCategory(category.key as any)}
          >
            {category.icon}
            <span className="ml-2">{category.label}</span>
          </Button>
        ))}
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAchievements.map((achievement) => (
          <Card
            key={achievement.id}
            className={`border-2 transition-all ${
              achievement.completed ? "border-mint bg-mint/10 shadow-md" : "border-gray-200 hover:border-mint/50"
            }`}
          >
            <CardContent className="p-6">
              <div className="text-center space-y-3">
                <div className="text-4xl">{achievement.icon}</div>
                <div>
                  <h3 className="font-bold text-lg">{achievement.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                </div>

                {achievement.completed ? (
                  <div className="space-y-2">
                    <Badge className="bg-mint text-white">已完成</Badge>
                    <div className="text-xs text-gray-500">完成于 {achievement.completedDate}</div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {achievement.progress !== undefined && achievement.maxProgress && (
                      <div>
                        <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                        <div className="text-xs text-gray-500 mt-1">
                          {achievement.progress} / {achievement.maxProgress}
                        </div>
                      </div>
                    )}
                    <Badge variant="outline" className="border-gray-300 text-gray-600">
                      进行中
                    </Badge>
                  </div>
                )}

                <div className="bg-gray-50 p-2 rounded text-xs">
                  <span className="font-medium">奖励：</span>
                  {achievement.reward}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Share Achievement */}
      <Card className="border-mint/20">
        <CardHeader>
          <CardTitle className="text-lg">分享成就</CardTitle>
          <CardDescription>将你的成就分享给朋友们</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center space-x-4">
            <Button className="bg-mint hover:bg-mint-dark text-white">生成成就卡片</Button>
            <Button variant="outline" className="border-mint/30 bg-transparent">
              分享到微信
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
