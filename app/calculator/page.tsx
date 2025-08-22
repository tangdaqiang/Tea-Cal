"use client"

import { useState } from "react"
import { Calculator, RotateCcw, Share2, BookOpen, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BrandSearch from "@/components/brand-search"
import CalorieBreakdown from "@/components/calorie-breakdown"
import { CalorieTable } from "@/components/calorie-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

// 小料数据
const ingredientData = {
  珍珠: 2.34, // per gram
  椰果: 0.4,
  芋圆: 2.0,
  红豆: 2.38,
  布丁: 1.5,
  仙草: 0.3,
  西米: 1.2,
  芋泥: 0.88,
}


export default function CalculatorPage() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [hasToppings, setHasToppings] = useState(false)
  const [selectedIngredients, setSelectedIngredients] = useState<Record<string, number>>({})
  const [isCalorieTableExpanded, setIsCalorieTableExpanded] = useState(false)

  // 计算添加小料后的总热量
  const calculateTotalCalories = () => {
    if (!selectedProduct) return 0

    // 产品基础热量
    let total = selectedProduct.calories

    // 添加小料热量
    total += Object.entries(selectedIngredients).reduce((sum, [name, amount]) => {
      return sum + (ingredientData[name as keyof typeof ingredientData] || 0) * amount
    }, 0)

    return Math.round(total)
  }

  const resetCalculator = () => {
    setSelectedProduct(null)
    setHasToppings(false)
    setSelectedIngredients({})
  }

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
                <Calculator className="w-6 h-6 text-mint" />
                <h1 className="text-xl font-bold text-gray-800">热量计算器</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={resetCalculator} className="border-mint/30 bg-transparent">
                <RotateCcw className="w-4 h-4 mr-2" />
                重置
              </Button>
              <Button className="bg-mint hover:bg-mint-dark text-white">
                <Share2 className="w-4 h-4 mr-2" />
                分享配方
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Calculator */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="search" className="w-full">
              <TabsList className="grid w-full grid-cols-1">
                <TabsTrigger value="search">品牌查询</TabsTrigger>
              </TabsList>

              <TabsContent value="search" className="space-y-6">
            <BrandSearch 
              onCalorieCalculate={(totalCalories) => {
                // 可以在这里更新任何需要的状态
                console.log('Total calories calculated:', totalCalories);
              }}
            />
          </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {selectedProduct && (
              <Card className="border-mint/20 bg-gradient-to-br from-mint/5 to-mint/10 shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-mint-dark">{selectedProduct.name}</CardTitle>
                  <CardDescription>{selectedProduct.brand} · {selectedProduct.size} · {selectedProduct.sugar}</CardDescription>
                  <div className="text-5xl font-bold text-mint-dark mt-2">
                    {calculateTotalCalories()}
                    <span className="text-xl font-normal ml-1">kcal</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm border-b pb-2 border-mint/20">
                      <span className="font-medium">基础热量</span>
                      <span className="font-medium">{selectedProduct.calories} kcal</span>
                    </div>

                    {hasToppings && Object.keys(selectedIngredients).length > 0 && (
                      <div className="space-y-2 mt-3 pt-3 border-t border-mint/20">
                        <div className="text-sm font-medium text-gray-500 mb-2">添加的小料</div>
                        {Object.entries(selectedIngredients).map(([name, amount]) => {
                          const calories = Math.round((ingredientData[name as keyof typeof ingredientData] || 0) * amount)

                          return (
                            <div key={name} className="flex justify-between items-center text-sm">
                              <span>{name} ({amount}g)</span>
                              <span>{calories} kcal</span>
                            </div>
                          )
                        })}

                        <div className="flex justify-between items-center font-medium pt-2 border-t border-mint/20 mt-2">
                          <span>小料总热量</span>
                          <span>{Object.entries(selectedIngredients).reduce((sum, [name, amount]) => {
                            return sum + Math.round((ingredientData[name as keyof typeof ingredientData] || 0) * amount)
                          }, 0)} kcal</span>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between text-sm pt-1 mt-2">
                      <span>相当于</span>
                      <span className="font-medium">{Math.round(calculateTotalCalories() / 4)} 克糖</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>需要跑步</span>
                      <span className="font-medium">{Math.round(calculateTotalCalories() / 8)} 分钟消耗</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>占日摄入</span>
                      <span className="font-medium">{Math.round((calculateTotalCalories() / 2000) * 100)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Calorie Breakdown */}
            {selectedProduct && (
              <CalorieBreakdown
                calories={calculateTotalCalories()}
              />            
            )}

            {/* Health Tips */}
            <Card className="border-mint/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <BookOpen className="w-5 h-5 text-mint mr-2" />
                  健康建议
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedProduct && calculateTotalCalories() > 300 && (
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <p className="text-sm text-orange-800">
                      💡 当前热量较高，建议：
                      <br />• 选择低热量小料如椰果或仙草
                      <br />• 减少小料添加量
                    </p>
                  </div>
                )
                }
                {selectedProduct && calculateTotalCalories() <= 300 && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-green-800">
                      💡 当前热量适中，可适量添加低热量小料。
                    </p>
                  </div>
                )}
                )}
                {calculateTotalCalories() <= 150 && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-green-800">
                      ✨ 很棒的低卡选择！这个配方既满足口感又控制了热量，继续保持！
                    </p>
                  </div>
                )}
                <div className="bg-mint/10 p-3 rounded-lg">
                  <p className="text-sm text-mint-dark">
                    💭 记住：偶尔享受高热量奶茶也没关系，关键是找到属于你的平衡点。
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Save Recipe */}
            <Card className="border-mint/20">
              <CardContent className="pt-6">
                <Button className="w-full bg-mint hover:bg-mint-dark text-white">保存这个配方</Button>
                <p className="text-xs text-gray-500 text-center mt-2">保存后可在"我的记录"中查看</p>
              </CardContent>
            </Card>



            {/* Collapsible Calorie Database */}
            <Card className="border-mint/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-800">📊 奶茶配料热量数据库</CardTitle>
                    <CardDescription>详细的配料热量信息和健康建议</CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsCalorieTableExpanded(!isCalorieTableExpanded)}
                    className="text-mint hover:text-mint-dark"
                  >
                    {isCalorieTableExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              {isCalorieTableExpanded && (
                <CardContent>
                  <CalorieTable />
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
