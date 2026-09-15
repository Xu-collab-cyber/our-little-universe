import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'

// 全局样式
import './index.css'

// 优雅衬线字体（随构建打包，离线可用）
import '@fontsource/cormorant-garamond/300.css'
import '@fontsource/cormorant-garamond/400.css'
import '@fontsource/cormorant-garamond/500.css'
import '@fontsource/cormorant-garamond/300-italic.css'
import '@fontsource/cormorant-garamond/400-italic.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* HashRouter：部署在任何子路径（GitHub Pages 等）下刷新都不会 404 */}
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
