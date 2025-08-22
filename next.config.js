/** @type {import('next').NextConfig} */
const nextConfig = {};

// 导入并应用修复插件
const fixRadixImport = require('./plugins/fix-radix-import');

module.exports = fixRadixImport(nextConfig);