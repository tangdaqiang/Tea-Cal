"use client"

import { useState, useEffect } from "react"
import { X, Heart, Smile, Frown, Star, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { mockProducts } from "@/components/brand-search"

interface RecordEntryProps {
  onClose: () => void
}

interface MilkTeaProduct {
  id: string
  name: string
  brand: string
  calories: number
  sugar: string
  size: string
  ingredients: string[]
  rating: number
  category: "low" | "medium" | "high"
  image?: string
}

export default function RecordEntry({ onClose }: RecordEntryProps) {
  const [drinkName, setDrinkName] = useState("")
  const [mood, setMood] = useState("")
  const [notes, setNotes] = useState("")
  const [matchedDrink, setMatchedDrink] = useState<MilkTeaProduct | null>(null)
  const [searchResults, setSearchResults] = useState<MilkTeaProduct[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const moods = [
    { key: "happy", label: "开心", icon: <Smile className="w-4 h-4" />, color: "bg-green-100 text-green-800" },
    { key: "relaxed", label: "放松", icon: <Heart className="w-4 h-4" />, color: "bg-blue-100 text-blue-800" },
    { key: "conflicted", label: "纠结", icon: <Frown className="w-4 h-4" />, color: "bg-yellow-100 text-yellow-800" },
    { key: "celebrating", label: "庆祝", icon: <Star className="w-4 h-4" />, color: "bg-purple-100 text-purple-800" },
  ]

  // 搜索奶茶
  const searchDrinks = (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      setMatchedDrink(null)
      return
    }

    setIsSearching(true)
    // 模拟搜索延迟
    setTimeout(() => {
      const results = mockProducts.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(results)
      // 如果只有一个结果，自动匹配
      if (results.length === 1) {
        setMatchedDrink(results[0])
      } else {
        setMatchedDrink(null)
      }
      setIsSearching(false)
    }, 300)
  }

  // 监听输入变化进行搜索
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchDrinks(drinkName)
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [drinkName])

  const handleSelectDrink = (drink: MilkTeaProduct) => {
    setMatchedDrink(drink)
    setDrinkName(drink.name)
    setSearchResults([])
  }

  const handleSubmit = () => {
    const record = {
      id: Date.now().toString(), // 添加唯一ID
      drink: matchedDrink ? {
        name: matchedDrink.name,
        brand: matchedDrink.brand,
        calories: matchedDrink.calories
      } : { name: drinkName, calories: 0 },
      mood,
      notes,
      timestamp: new Date().toISOString(),
    }
    
    // 从localStorage获取现有记录
    const existingRecords = JSON.parse(localStorage.getItem('milkTeaRecords') || '[]')
    // 添加新记录
    existingRecords.push(record)
    // 保存回localStorage
    localStorage.setItem('milkTeaRecords', JSON.stringify(existingRecords))
    
    console.log("Recording saved:", record)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">记录奶茶</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Drink Name Input */}
          <div>
            <h3 className="font-medium mb-3">奶茶名称</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="输入奶茶名称..."
                value={drinkName}
                onChange={(e) => setDrinkName(e.target.value)}
                className="pl-10 border-mint/30"
              />
            </div>

            {/* Calorie Note */}
            {searchResults.length > 0 && (
              <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm">
                <p className="text-yellow-800">
                  <span className="font-medium">热量参考:</span> {searchResults[0].calories}kcal ({searchResults[0].brand})
                </p>
                {searchResults.length > 1 && (
                  <p className="text-yellow-700 mt-1">
                    找到多个匹配结果，请从列表中选择具体的奶茶以获取准确热量
                  </p>
                )}
              </div>
            )}

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-2 border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto bg-white z-10">
                {searchResults.map((drink) => (
                  <div
                    key={drink.id}
                    className="p-3 hover:bg-mint/10 cursor-pointer flex items-center justify-between"
                    onClick={() => handleSelectDrink(drink)}
                  >
                    <div>
                      <p className="font-medium">{drink.name}</p>
                      <p className="text-xs text-gray-500">{drink.brand}</p>
                    </div>
                    <div className="font-bold text-mint-dark">{drink.calories}kcal</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Matched Drink Display */}
          {matchedDrink && (
            <Card className="border-mint/20 bg-mint/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{matchedDrink.name}</h4>
                    <p className="text-sm text-gray-600">
                      {matchedDrink.brand} · {matchedDrink.size} · {matchedDrink.sugar}
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-mint-dark">{matchedDrink.calories}kcal</div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Mood Selection */}
          <div>
            <h3 className="font-medium mb-3">今天的心情</h3>
            <div className="grid grid-cols-4 gap-3">
              {moods.map((moodOption) => (
                <button
                  key={moodOption.key}
                  onClick={() => setMood(moodOption.key)}
                  className={`p-3 rounded-lg border-2 transition-all text-center ${mood === moodOption.key ? "border-mint bg-mint/10" : "border-gray-200 hover:border-mint/50"}
                  `}>
                  <div className="flex flex-col items-center space-y-1">
                    {moodOption.icon}
                    <span className="text-xs font-medium">{moodOption.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="font-medium mb-3">备注</h3>
            <Textarea
              placeholder="记录今天喝奶茶的感受或特殊情况..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="border-mint/30"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1 border-mint/30 bg-transparent">
              取消
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!drinkName.trim()}
              className="flex-1 bg-mint hover:bg-mint-dark text-white"
            >
              完成记录
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
