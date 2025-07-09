import { Toaster } from 'sonner'
import './App.css'
import { lazy, useEffect, useState } from 'react'
// import BookReadingTrackerLayout from './components/BookReadingTrackerLayout'
// import ResponsiveArticleCard from './components/newArticalPreview'
// import BookReadTracker from ''
// import DailyQoutes from './pages/DailyQuotes'
// import DailyStreak from './pages/DailyStreak'
// import Layout from './pages/Layout'
// import MonthlyTracker from './pages/MonthlyTracker'
// import TaskDashboard from './pages/TaskTracker'
// import WeekTrackerComponent from './pages/WeeklyTaskTracker'
import { BrowserRouter as Router, Route, Navigate, Routes, useNavigate } from 'react-router-dom'

const ProgressTracker = lazy(() => import('./components/ProgressTracker'))
const BookReadTracker = lazy(() => import('./pages/BookReadTracker'))
const TestElement = lazy(() => import('./components/TestElement'))
const PromptAssistant = lazy(()=>import('./pages/AiAssistant'))
const NoPage = <div>No Page Founded</div>
const Validation = (key) => {
  try {
    const hasKey = localStorage.getItem(key)
    return !hasKey
  } catch (e) {
    console.log("Fetch Faild", e)
    return true
  }
}
function App() {
  const [privateElement, setProtected] = useState(false)
  useEffect(() => {
    if (Validation('plan')) {
      setProtected(true)
      return
    }
    setProtected(false)
  }, [])
  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <Router>
        <Routes>
          <Route path='/' >
            <Route index element={<Navigate to="progress-tracker" />} />
            <Route path='progress-tracker' element={<ProgressTracker />} />
            <Route path='book-tracker' element={<BookReadTracker />} />
            <Route path='ai-assistant' element={<PromptAssistant/>}/>
            <Route path='test' element={privateElement ? <TestElement /> : <>Hello, not found</>} />
          </Route>
          <Route path='*' element={NoPage} />

        </Routes>
      </Router>
      {/* <ResponsiveArticleCard /> */}
      {/* <TaskDashboard/> */}
      {/* <DailyStreak/> */}
      {/* <MonthlyTracker/> */}
      {/* <DailyQoutes /> */}
      {/* <Layout>
        <WeekTrackerComponent />
      </Layout> */}
      {/* <BookReadingTrackerLayout>
        <BookReadTracker/>
      </BookReadingTrackerLayout> */}
      {/* <ProgressTracker /> */}
    </>
  )
}

export default App
