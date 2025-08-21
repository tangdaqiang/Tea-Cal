"use client"

import { useState } from "react"
import { Calculator, RotateCcw, Share2, BookOpen, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SugarLevelCalculator from "@/components/sugar-level-calculator"
import CupSizeSelector from "@/components/cup-size-selector"
import IngredientSelector from "@/components/ingredient-selector"
import BrandSearch from "@/components/brand-search"
import CalorieBreakdown from "@/components/calorie-breakdown"
import { CalorieTable } from "@/components/calorie-table"


export default function CalculatorPage() {
  const [cupSize, setCupSize] = useState<"small" | "medium" | "large">("medium")
  const [sugarLevel, setSugarLevel] = useState(50)
  const [selectedIngredients, setSelectedIngredients] = useState<Record<string, number>>({})
  const [milkType, setMilkType] = useState("whole-milk")
  const [hasTopping, setHasTopping] = useState(false)
  const [isCalorieTableExpanded, setIsCalorieTableExpanded] = useState(false)

  // Base calories from tea + milk
  const baseCalories = {
    small: { "whole-milk": 60, "skim-milk": 30, "plant-milk": 45, "creamer": 50 },
    medium: { "whole-milk": 120, "skim-milk": 60, "plant-milk": 90, "creamer": 100 },
    large: { "whole-milk": 160, "skim-milk": 80, "plant-milk": 120, "creamer": 130 },
  }

  // Sugar calories
  const sugarCalories = {
    small: (sugarLevel / 100) * 80,
    medium: (sugarLevel / 100) * 120,
    large: (sugarLevel / 100) * 160,
  }

  const calculateTotalCalories = () => {

    // Ingredient calories
    const ingredientCalories = Object.entries(selectedIngredients).reduce((total, [name, amount]) => {
      const ingredientData = {
        珍珠: 2.34, // per gram
        椰果: 0.4,
        芋圆: 2.0,
        红豆: 2.38,
        布丁: 1.5,
        仙草: 0.3,
      }
      return total + (ingredientData[name as keyof typeof ingredientData] || 0) * amount
    }, 0)

    // Topping calories (cheese foam, etc.)
    const toppingCalories = hasTopping ? 195 : 0

    return Math.round(
      baseCalories[cupSize][milkType as keyof typeof baseCalories.small] +
        sugarCalories[cupSize] +
        ingredientCalories +
        toppingCalories,
    )
  }

  const resetCalculator = () => {
    setCupSize("medium")
    setSugarLevel(50)
    setSelectedIngredients({})
    setMilkType("whole-milk")
    setHasTopping(false)
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
            <Tabs defaultValue="custom" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="custom">自定义配方</TabsTrigger>
                <TabsTrigger value="search">品牌查询</TabsTrigger>
              </TabsList>

              <TabsContent value="custom" className="space-y-6">
                {/* Cup Size Selection */}
                <Card className="border-mint/20">
                  <CardHeader>
                    <CardTitle className="text-lg">选择杯型</CardTitle>
                    <CardDescription>不同杯型的基础热量不同</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CupSizeSelector value={cupSize} onChange={setCupSize} />
                  </CardContent>
                </Card>

                {/* Sugar Level */}
                <Card className="border-mint/20">
                  <CardHeader>
                    <CardTitle className="text-lg">糖度选择</CardTitle>
                    <CardDescription>调整糖度，实时查看热量变化</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SugarLevelCalculator value={sugarLevel} onChange={setSugarLevel} cupSize={cupSize} />
                  </CardContent>
                </Card>

                {/* Milk Type */}
                <Card className="border-mint/20">
                  <CardHeader>
                    <CardTitle className="text-lg">奶制品选择</CardTitle>
                    <CardDescription>选择不同的奶制品类型</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Select value={milkType} onValueChange={setMilkType}>
                      <SelectTrigger className="border-mint/30">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="whole-milk">全脂牛奶 (+120kcal)</SelectItem>
                        <SelectItem value="skim-milk">脱脂牛奶 (+60kcal)</SelectItem>
                        <SelectItem value="plant-milk">植物奶 (+90kcal)</SelectItem>
                        <SelectItem value="creamer">奶精 (+100kcal)</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                {/* Ingredients */}
                <Card className="border-mint/20">
                  <CardHeader>
                    <CardTitle className="text-lg">添加配料</CardTitle>
                    <CardDescription>选择你喜欢的配料，点击加号添加用量</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <IngredientSelector selectedIngredients={selectedIngredients} onChange={setSelectedIngredients} />
                    
                    {/* 配料总热量显示 */}
                    {Object.keys(selectedIngredients).length > 0 && (
                      <div className="mt-4 p-3 bg-mint/10 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">配料总热量:</span>
                          <span className="font-bold text-mint-dark">
                            {Object.entries(selectedIngredients).reduce((total, [name, amount]) => {
                              const ingredientData = {
                                珍珠: 2.34,
                                椰果: 0.4,
                                芋圆: 2.0,
                                红豆: 2.38,
                                布丁: 1.5,
                                仙草: 0.3,
                                西米: 1.2,
                                芋泥: 0.88,
                              }
                              return total + (ingredientData[name as keyof typeof ingredientData] || 0) * amount
                            }, 0).toFixed(0)} kcal
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Toppings */}
                <Card className="border-mint/20">
                  <CardHeader>
                    <CardTitle className="text-lg">特殊配料</CardTitle>
                    <CardDescription>奶盖、芝士等高热量配料</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4">
                      <Button
                        variant={hasTopping ? "default" : "outline"}
                        onClick={() => setHasTopping(!hasTopping)}
                        className={hasTopping ? "bg-mint text-white" : "border-mint/30 bg-transparent"}
                      >
                        芝士奶盖 (+195kcal)
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="search">
                <BrandSearch />
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {/* Total Calories */}
            <Card className="border-mint/20 bg-gradient-to-br from-mint/5 to-mint/10 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-mint-dark">总热量</CardTitle>
                <div className="text-5xl font-bold text-mint-dark mt-2">
                  {calculateTotalCalories()}
                  <span className="text-xl font-normal ml-1">kcal</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm border-b pb-2 border-mint/20">
                    <span className="font-medium">奶茶基础</span>
                    <span className="font-medium">
                      {baseCalories[cupSize][milkType as keyof typeof baseCalories.small] + 
                      sugarCalories[cupSize]} kcal
                    </span>
                  </div>
                  <div className="flex justify-between text-sm border-b pb-2 border-mint/20">
                    <span className="font-medium">配料热量</span>
                    <span className="font-medium">
                      {Object.entries(selectedIngredients).reduce((total, [name, amount]) => {
                        const ingredientData = {
                          珍珠: 2.34,
                          椰果: 0.4,
                          芋圆: 2.0,
                          红豆: 2.38,
                          布丁: 1.5,
                          仙草: 0.3,
                          西米: 1.2,
                          芋泥: 0.88,
                        }
                        return total + (ingredientData[name as keyof typeof ingredientData] || 0) * amount
                      }, 0).toFixed(0)} kcal
                    </span>
                  </div>
                  <div className="flex justify-between text-sm border-b pb-2 border-mint/20">
                    <span className="font-medium">特殊配料</span>
                    <span className="font-medium">{hasTopping ? "195 kcal" : "0 kcal"}</span>
                  </div>
                  <div className="flex justify-between text-sm pt-1">
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

            {/* Calorie Breakdown */}
            <CalorieBreakdown
              cupSize={cupSize}
              sugarLevel={sugarLevel}
              milkType={milkType}
              ingredients={selectedIngredients}
              hasTopping={hasTopping}
            />

            {/* Health Tips */}
            <Card className="border-mint/20">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <BookOpen className="w-5 h-5 text-mint mr-2" />
                  健康建议
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {calculateTotalCalories() > 300 && (
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <p className="text-sm text-orange-800">
                      💡 当前热量较高，建议：
                      <br />• 选择脱脂牛奶替代全脂牛奶
                      <br />• 降低糖度到三分糖
                      <br />• 用椰果替代珍珠
                    </p>
                  </div>
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
