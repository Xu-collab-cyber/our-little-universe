# Our Little Universe ✦

> A tiny universe made for you.
> 只属于我们两个人的私人数字空间：我们的故事 + 情书 + 关于她的小事 + 我们的未来 + 生日彩蛋。

一个移动端优先的 PWA（可安装到手机桌面），深色星空、电影感、克制而浪漫。

---

## 一、如何运行

```bash
npm install      # 安装依赖
npm run dev      # 本地开发（浏览器打开 http://localhost:5173）
npm run build    # 构建生产版本（输出到 dist/）
npm run preview  # 本地预览生产版本（http://localhost:4173）
```

首次安装后如需重新生成 PWA 图标：`npm run icons`

## 二、项目结构

```
src/
  data/
    content.ts          ← ★ 内容中心：所有文字 / 照片 / 音乐配置都在这里
  components/           ← 星空、照片占位、信封、音乐按钮、页面外壳等
  pages/                ← Opening / Home / Story / Letters / LetterView / About / Future / Birthday
  hooks/                ← useReveal（滚动渐入）、useMusic（音乐系统）
  utils/
public/
  photos/               ← 放照片（目前是占位状态）
  music/                ← 放音乐 our-song.mp3
  icons/                ← PWA 图标（npm run icons 生成）
scripts/
  generate-icons.mjs    ← PWA 图标生成脚本（零依赖）
```

## 三、如何修改文字

打开 [src/data/content.ts](src/data/content.ts)，里面按页面分区：

- `opening` — 开场页文字
- `home` — 主页标题、欢迎语、四个入口
- `story` — 时间线的每一段故事
- `letters` — 每一封信（含锁定信的文案）
- `about` — 关于你的 10 件小事
- `future` — 未来的年份列表和结尾那句话
- `birthday` — 生日彩蛋的播放内容
- `music` — 音乐配置

改完保存，页面立即热更新。**所有文案都在这个文件里，组件里没有任何硬编码内容。**

## 四、如何添加照片

1. 把照片放进 [public/photos/](public/photos/)，文件名对应（详见该目录的 README.txt）：
   - `story-01.jpg` ~ `story-04.jpg` — 我们的故事
   - `about-01.jpg` ~ `about-10.jpg` — 关于你
   - `birthday.jpg` — 生日彩蛋
2. 重新构建（`npm run build`）后自动显示。

照片不存在时会显示优雅的「PHOTO PLACEHOLDER」占位图（并提示期望的文件路径），**绝不会出现破图**。支持 jpg / jpeg / png / webp。

## 五、如何添加音乐

1. 把音乐文件放到 [public/music/](public/music/)，命名为 `our-song.mp3`
2. 在 [src/data/content.ts](src/data/content.ts) 的 `music` 配置里把 `enabled: false` 改成 `true`
3. 重新构建。

音乐**不会自动播放**（手机浏览器限制），由用户点击右上角 ♪ 按钮开始 / 暂停。

## 六、如何安装成手机 PWA

1. 把项目部署到任何支持 HTTPS 的静态托管（Vercel / Netlify / GitHub Pages 等），或局域网内用 HTTPS 访问
2. 手机浏览器打开网址
3. Android Chrome：菜单 → 「添加到主屏幕」；iPhone Safari：分享 → 「添加到主屏幕」
4. 之后就像普通 App 一样从桌面图标打开，全屏运行、离线可用

> 注意：PWA 安装要求 HTTPS（或 localhost 调试）。

## 七、技术说明

- React 18 + Vite 5 + TypeScript（严格模式）
- vite-plugin-pwa：自动生成 manifest + Service Worker，支持离线
- 所有动画基于 CSS transform / opacity（Android 流畅）
- 星空为 Canvas 粒子，页面不可见时自动暂停
- 移动端优先，适配 360 / 375 / 390 / 412px，支持安全区（刘海屏）
