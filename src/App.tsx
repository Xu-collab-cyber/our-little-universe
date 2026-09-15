import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import StarField from './components/StarField'
import Opening from './pages/Opening'
import Home from './pages/Home'
import Story from './pages/Story'
import Letters from './pages/Letters'
import LetterView from './pages/LetterView'
import AboutYou from './pages/AboutYou'
import Future from './pages/Future'
import Birthday from './pages/Birthday'

/**
 * 路由入口。
 * 所有页面共享一层非常微弱的背景星空；
 * key 绑定 pathname，让每次页面切换都重新播放入场动画。
 */
export default function App() {
  const location = useLocation()

  return (
    <div className="app">
      <StarField density={0.35} className="global-stars" />

      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Opening />} />
        <Route path="/home" element={<Home />} />
        <Route path="/story" element={<Story />} />
        <Route path="/letters" element={<Letters />} />
        <Route path="/letters/:id" element={<LetterView />} />
        <Route path="/about" element={<AboutYou />} />
        <Route path="/future" element={<Future />} />
        <Route path="/birthday" element={<Birthday />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
