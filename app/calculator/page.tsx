"use client"

import React, { useState, useEffect } from 'react';

// 简单的错误边界组件
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Calculator page error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="max-w-md w-full text-center">
            <CardHeader>
              <CardTitle>出错了</CardTitle>
            </CardHeader>
            <CardContent>
              <p>计算器页面加载时发生错误。</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                重新加载
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
import { Calculator, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BrandSearch from "@/components/brand-search"
import IngredientSelector from "@/components/ingredient-selector"


export default function CalculatorPage() {
  const [drinkCalories, setDrinkCalories] = useState(0);
  const [ingredientsCalories, setIngredientsCalories] = useState(0);
  // 总热量通过基础热量和配料热量计算得出，无需单独存储
  const totalCalories = drinkCalories + ingredientsCalories;
  const [selectedIngredients, setSelectedIngredients] = useState<Record<string, number>>({})
  const [selectedDrink, setSelectedDrink] = useState<any>(null)
  const [isCalorieTableExpanded, setIsCalorieTableExpanded] = useState(false)

  // 计算配料总热量
  const calculateIngredientsCalories = () => {
    return Object.entries(selectedIngredients).reduce((total, [name, amount]) => {
      const ingredientData = {
        珍珠: 2.34, // per gram
        // 这里的热量数据会被ingredients数组中的数据覆盖
        椰果: 0.4,
        芋圆: 2.0,
        红豆: 2.38,
        布丁: 1.5,
        仙草: 0.3,
        西米: 1.2,
        芋泥: 0.88,
        波霸: 0.72,
        小珍珠: 0.7,
        茶冻: 0.52,
        栀子冻: 0.58,
        椰奶冻: 1.54,
        仙草冻: 0.96,
        青稞: 1.44,
        西米明珠: 1.58,
        益禾布丁: 1.2,
        益禾红豆: 0.9,
        益禾椰果: 0.78,
        冻冻: 0.54,
        多肉晶球: 0.7,
        益禾仙草: 0.8,
        益禾珍珠: 2.2,
        葡萄果肉: 0.5,
        芝士奶盖: 2.4,
        马蹄爆爆珠: 0.72,
        马蹄丸子: 0.68,
        西柚粒: 0.3,
        血糯米: 2.2,
        奶冻: 1.2,
        沪上冻冻: 0.56,
        厚芋泥: 1.84,
        小多肉: 0.5,
        谷谷茶金砖: 0.9,
        米麻薯: 2.78,
        黑糖波波: 3.2,
        大多肉: 0.6,
        沪上芝士奶盖: 3.4,
      }
      return total + (ingredientData[name as keyof typeof ingredientData] || 0) * amount
    }, 0)
  }

  // 计算运动消耗时间（假设每消耗100kcal需要跑步10分钟）
  const calculateExerciseTime = (calories: number) => {
    return calories > 0 ? Math.round(calories / 10) : 0;
  }

  // 只在组件初始化时运行一次
  useEffect(() => {
    setDrinkCalories(0);
    setIngredientsCalories(0);
  }, [])

  // 自动计算热量
  useEffect(() => {
    if (selectedDrink || Object.keys(selectedIngredients).length > 0) {
      // 计算奶茶基础热量
      const drinkCal = selectedDrink?.calories || 0;
      setDrinkCalories(drinkCal);
      // 计算配料总热量
      const ingredientsCal = calculateIngredientsCalories();
      setIngredientsCalories(ingredientsCal);
    }
  }, [selectedDrink, selectedIngredients])

  return (
    <ErrorBoundary>
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

                <TabsContent value="search">
                  <BrandSearch
                    selectedIngredients={selectedIngredients}
                    onIngredientsChange={setSelectedIngredients}
                    onDrinkSelect={(drink) => {
                      setSelectedDrink(drink);
                    }}
                  />
                </TabsContent>
              </Tabs>
            </div>

            {/* 添加配料模块 - 移到品牌查询和结果中间 */}
            <div className="space-y-6 lg:col-span-2">
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
                          {ingredientsCalories.toFixed(0)} kcal
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Results */}
            <div className="space-y-6 lg:col-span-1">
              <div className="flex flex-col items-center space-y-2">
                {(!selectedDrink && Object.keys(selectedIngredients).length === 0) && (
                  <p className="text-sm text-gray-500 mt-1">
                    请先选择奶茶或添加配料
                  </p>
                )}
              </div>
              {/* Total Calories */}
              <Card className="border-mint/20 bg-gradient-to-br from-mint/5 to-mint/10 shadow-lg h-full">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-mint-dark">总热量</CardTitle>
                    <div className="text-5xl font-bold text-mint-dark mt-2">
                      {(drinkCalories + ingredientsCalories).toFixed(0)}
                      <span className="text-xl font-normal ml-1">kcal</span>
                    </div>
                </CardHeader>
                <CardContent>
                    {totalCalories > 0 ? (
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm border-b pb-2 border-mint/20">
                          <span className="font-medium">奶茶基础热量</span>
                          <span className="font-medium">{drinkCalories.toFixed(0)} kcal</span>
                        </div>
                        <div className="flex justify-between text-sm border-b pb-2 border-mint/20">
                          <span className="font-medium">配料总热量</span>
                          <span className="font-medium">{ingredientsCalories.toFixed(0)} kcal</span>
                        </div>
                        {/* 直接显示总热量，不使用标签 */}
                        <div className="flex justify-end text-sm font-bold pt-2 text-mint-dark">
                          <span>{(drinkCalories + ingredientsCalories).toFixed(0)} kcal</span>
                        </div>
                        <div className="flex justify-between text-sm pt-1 text-gray-600">
                          <span>需要跑步</span>
                          <span>{calculateExerciseTime(drinkCalories + ingredientsCalories)} 分钟消耗</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 py-4">
                        <p>选择奶茶和配料后自动显示详细热量信息</p>
                      </div>
                    )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}
