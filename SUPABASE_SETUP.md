# Supabase 配置说明

## 问题描述
如果你遇到注册后无法登录的问题，可能是因为 Supabase 配置缺失导致的。

## 解决方案

### 方案1：配置 Supabase（推荐）
1. 在项目根目录创建 `.env.local` 文件
2. 添加以下内容：
\`\`\`bash
NEXT_PUBLIC_SUPABASE_URL=你的Supabase项目URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的Supabase匿名密钥
\`\`\`

### 方案2：使用本地存储模式（临时）
如果暂时不想配置 Supabase，系统会自动使用 localStorage 模式：
- 用户数据存储在浏览器本地
- 不需要数据库配置
- 适合开发和测试

## 当前状态检查
打开浏览器开发者工具的控制台，查看是否有以下日志：
- "注册成功: {username, passwordHash, userId}"
- "登录尝试: {username, passwordHash}"
- "存储的用户: [...]"

## 故障排除
如果仍然无法登录：
1. 清除浏览器本地存储：`localStorage.clear()`
2. 重新注册用户
3. 检查控制台错误信息

## 注意事项
- 本地存储模式的数据只存在于当前浏览器
- 清除浏览器数据会导致用户信息丢失
- 生产环境建议使用 Supabase 数据库
