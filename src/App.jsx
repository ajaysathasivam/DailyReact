import { Toaster } from 'sonner'
import './App.css'
import BookReadingTrackerLayout from './components/BookReadingTrackerLayout'
import ResponsiveArticleCard from './components/newArticalPreview'
import BookReadTracker from './pages/BookReadTracker'
import DailyQoutes from './pages/DailyQuotes'
import DailyStreak from './pages/DailyStreak'
import Layout from './pages/Layout'
import MonthlyTracker from './pages/MonthlyTracker'
import TaskDashboard from './pages/TaskTracker'
import WeekTrackerComponent from './pages/WeeklyTaskTracker'

function App() {

  return (
    <>
    <Toaster position="top-right" richColors closeButton />
      {/* <ResponsiveArticleCard /> */}
      {/* <TaskDashboard/> */}
      {/* <DailyStreak/> */}
      {/* <MonthlyTracker/> */}
      {/* <DailyQoutes /> */}
      {/* <Layout>
        <WeekTrackerComponent />
      </Layout> */}
      <BookReadingTrackerLayout>
        <BookReadTracker/>
      </BookReadingTrackerLayout>
    </>
  )
}

export default App
