"use client"

import { useState } from "react"
import { X, Heart, Smile, Frown, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import CupSizeSelector from './cup-size-selector'
import SugarLevelCalculator from './sugar-level-calculator'
import BrandSearch from './brand-search'

interface RecordEntryProps {
  onClose: () => void
}

export default function RecordEntry({ onClose }: RecordEntryProps) {

  const [selectedDrink, setSelectedDrink] = useState<any>(null)
  const [mood, setMood] = useState("")
  const [cupSize, setCupSize] = useState<"small" | "medium" | "large">(\'medium\')
  const [sugarLevel, setSugarLevel] = useState(50)
  const [notes, setNotes] = useState("")
  const [showBrandSearch, setShowBrandSearch] = useState(false)



  const moods = [
    { key: "happy", label: "开心", icon: <Smile className="w-4 h-4" />, color: "bg-green-100 text-green-800" },
    { key: "relaxed", label: "放松", icon: <Heart className="w-4 h-4" />, color: "bg-blue-100 text-blue-800" },
    { key: "conflicted", label: "纠结", icon: <Frown className="w-4 h-4" />, color: "bg-yellow-100 text-yellow-800" },
    { key: "celebrating", label: "庆祝", icon: <Star className="w-4 h-4" />, color: "bg-purple-100 text-purple-800" },
  ]

  // 计算总热量
  const calculateTotalCalories = () => {
    if (!selectedDrink) return 0

    // 基础热量
    let baseCalories = selectedDrink.calories

    // 根据杯型调整热量
    const cupSizeMultiplier = {
      small: 0.8,
      medium: 1,
      large: 1.3
    }
    baseCalories *= cupSizeMultiplier[cupSize]

    // 添加糖的热量
    const sugarCalories = {
      small: 20,
      medium: 30,
      large: 40
    }
    const sugarRatio = sugarLevel / 100
    const totalSugarCalories = sugarCalories[cupSize] * sugarRatio

    return Math.round(baseCalories + totalSugarCalories)
  }

  const handleSubmit = () => {
    const record = {
      drink: selectedDrink,
      cupSize,
      sugarLevel,
      sugarLevelName: getSugarLevelName(sugarLevel),
      mood,
      notes,
      calories: calculateTotalCalories(),
      timestamp: new Date(),
    }
    console.log("Recording:", record)
    onClose()
  }

  // 获取糖度名称
  const getSugarLevelName = (percentage: number) => {
    if (percentage === 0) return "无糖"
    if (percentage <= 30) return "三分糖"
    if (percentage <= 50) return "五分糖"
    if (percentage <= 70) return "七分糖"
    return "全糖"
  }

  return (
    <>    
      {/* Brand Search Modal */}
      {showBrandSearch && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold">选择奶茶</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowBrandSearch(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-6">
              <BrandSearch
                onCalorieCalculate={(product) => {
                  setSelectedDrink(product);
                  setShowBrandSearch(false);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Record Entry Modal */}
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold">记录奶茶</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">




          {/* Select Drink Button */}
          <div>
            <Button
              onClick={() => setShowBrandSearch(true)}
              className="w-full border-mint/30 bg-transparent hover:bg-mint/5"
            >
              {selectedDrink ? `已选择: ${selectedDrink.name}` : "选择奶茶"}
            </Button>
          </div>

          {/* Selected Drink Display */}
          {selectedDrink && (
            <Card className="border-mint/20 bg-mint/5 mt-4">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{selectedDrink.name}</h4>
                    <p className="text-sm text-gray-600">
                      {selectedDrink.brand}
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-mint-dark">{calculateTotalCalories()}kcal</div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Cup Size Selection */}
          {selectedDrink && (
            <div>
              <h3 className="font-medium mb-3 mt-6">选择杯型</h3>
              <CupSizeSelector
                value={cupSize}
                onChange={(size) => setCupSize(size)}
              />
            </div>
          )}

          {/* Sugar Level Selection */}
          {selectedDrink && (
            <div>
              <h3 className="font-medium mb-3 mt-6">选择糖度</h3>
              <SugarLevelCalculator
                value={sugarLevel}
                onChange={(level) => setSugarLevel(level)}
                cupSize={cupSize}
              />
            </div>
          )}

          {/* Mood Selection */}
          <div>
            <h3 className="font-medium mb-3 mt-6">今天的心情</h3>
            <div className="grid grid-cols-4 gap-3">
              {moods.map((moodOption) => (
                <button
                  key={moodOption.key}
                  onClick={() => setMood(moodOption.key)}
                  className={`p-3 rounded-lg border-2 transition-all text-center ${
                    mood === moodOption.key ? "border-mint bg-mint/10" : "border-gray-200 hover:border-mint/50"
                  }`}
                >
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
              disabled={!selectedDrink}
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
