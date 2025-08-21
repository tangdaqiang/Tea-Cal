"use client"

import { useState } from "react"
import { X, Camera, Heart, Smile, Frown, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

interface RecordEntryProps {
  onClose: () => void
}

export default function RecordEntry({ onClose }: RecordEntryProps) {

  const [selectedDrink, setSelectedDrink] = useState<any>(null)
  const [mood, setMood] = useState("")
  const [photo, setPhoto] = useState<string | null>(null)
  const [notes, setNotes] = useState("")



  const moods = [
    { key: "happy", label: "开心", icon: <Smile className="w-4 h-4" />, color: "bg-green-100 text-green-800" },
    { key: "relaxed", label: "放松", icon: <Heart className="w-4 h-4" />, color: "bg-blue-100 text-blue-800" },
    { key: "conflicted", label: "纠结", icon: <Frown className="w-4 h-4" />, color: "bg-yellow-100 text-yellow-800" },
    { key: "celebrating", label: "庆祝", icon: <Star className="w-4 h-4" />, color: "bg-purple-100 text-purple-800" },
  ]

  const handleSubmit = () => {
    const record = {
      drink: selectedDrink,
      mood,
      photo,
      notes,
      timestamp: new Date(),
    }
    console.log("Recording:", record)
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




          {/* Selected Drink Display */}
          {selectedDrink && (
            <Card className="border-mint/20 bg-mint/5">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold">{selectedDrink.name}</h4>
                    <p className="text-sm text-gray-600">
                      {selectedDrink.brand} · {selectedDrink.config}
                    </p>
                  </div>
                  <div className="text-2xl font-bold text-mint-dark">{selectedDrink.calories}kcal</div>
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

          {/* Photo Upload */}
          <div>
            <h3 className="font-medium mb-3">拍照记录</h3>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
              <Camera className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500 mb-2">为你的奶茶拍张照片吧</p>
              <Button variant="outline" className="border-mint/30 bg-transparent">
                <Camera className="w-4 h-4 mr-2" />
                拍照
              </Button>
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
