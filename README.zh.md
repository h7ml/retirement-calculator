# 退休计算器

访问地址：[retirement-calculator.h7ml.cn](https://retirement-calculator.h7ml.cn)

## 概述

这个退休计算器是一个使用 Vite、React、Ant Design 和 Tailwind CSS 构建的 Web 应用程序。它帮助用户根据出生日期和就业类型计算退休年龄和相关信息。

## 功能

- 根据出生年月计算退休年龄
- 支持不同的退休政策（男性、女性 50 岁退休、女性 55 岁退休）
- 使用 Ant Design 组件的用户友好界面
- 响应式设计，适用于桌面和移动设备

## 安装

1. 克隆仓库：

   ```
   git clone https://github.com/h7ml/retirement-calculator.git
   cd retirement-calculator
   ```

2. 安装依赖：

   ```
   npm install
   ```

3. 启动开发服务器：

   ```
   npm run dev
   ```

4. 在浏览器中打开 [http://localhost:5173](http://localhost:5173) 查看应用。

## 使用方法

1. 输入您的出生年月
2. 选择您的就业类型（男性、女性 50 岁退休、或女性 55 岁退休）
3. 点击"计算"查看您的退休信息

## 生产环境构建

要构建生产环境的应用，运行：

```
npm run build
```

构建后的文件将位于 `dist` 目录中。

## 贡献

欢迎贡献！请随时提交 Pull Request。

## 许可证

本项目采用 MIT 许可证。详情请查看 [LICENSE](LICENSE) 文件。
